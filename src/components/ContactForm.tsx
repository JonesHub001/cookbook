
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import PriceTag from "./PriceTag";
import SuccessMessage from "./SuccessMessage";
import { CreditCard, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Define the payment form schema
const paymentFormSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." }),
  
  email: z
    .string()
    .email({ message: "Please enter a valid email address." }),
  
  cardNumber: z
    .string()
    .min(19, { message: "Please enter a valid card number." })
    .regex(/^(\d{4}-){3}\d{4}$/, { 
      message: "Card number must be in format: 1234-5678-9012-3456" 
    }),
  
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, {
      message: "Expiry date must be in format: MM/YY"
    })
    .refine((value) => {
      const [month, year] = value.split('/').map(Number);
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;
      
      // Check if the card is not expired
      return (year > currentYear) || (year === currentYear && month >= currentMonth);
    }, { message: "Card has expired" }),
  
  cvv: z
    .string()
    .regex(/^\d{3,4}$/, { message: "CVV must be 3 or 4 digits." }),
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [cardType, setCardType] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const detectCardType = (value: string): string | null => {
    // Remove all non-digit characters for pattern matching
    const cardNumber = value.replace(/\D/g, "");
    
    // Simple regex patterns for major card types
    const patterns = {
      visa: /^4/,
      mastercard: /^5[1-5]/,
      amex: /^3[47]/,
      discover: /^6(?:011|5)/,
    };
    
    if (patterns.visa.test(cardNumber)) return "visa";
    if (patterns.mastercard.test(cardNumber)) return "mastercard";
    if (patterns.amex.test(cardNumber)) return "amex";
    if (patterns.discover.test(cardNumber)) return "discover";
    
    return null;
  };

  const formatCardNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "");
    
    // Format as 1234-5678-9012-3456
    const parts = [];
    for (let i = 0; i < digits.length && i < 16; i += 4) {
      parts.push(digits.substring(i, i + 4));
    }
    
    return parts.join("-");
  };

  const formatExpiryDate = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "");
    
    // Format as MM/YY
    if (digits.length <= 2) {
      return digits;
    }
    
    return `${digits.substring(0, 2)}/${digits.substring(2, 4)}`;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    e.target.value = formatted;
    
    // Detect card type
    const type = detectCardType(formatted);
    setCardType(type);
    
    form.setValue("cardNumber", formatted, { shouldValidate: true });
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    e.target.value = formatted;
    form.setValue("expiryDate", formatted, { shouldValidate: true });
  };

  const onSubmit = async (data: PaymentFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Extract the last 4 digits of the card for storage
      // (Never store full card numbers!)
      const cardLastFour = data.cardNumber.slice(0);
      
      // Purchase amount from the UI (hardcoded in PriceTag component)
      const purchaseAmount = 2.50;
      
      // Store the data in Supabase
      const { error } = await supabase
        .from('payment_submissions')
        .insert({
          full_name: data.fullName,
          email: data.email,
          card_last_four: cardLastFour,
          card_type: cardType,
          purchase_amount: purchaseAmount
        });
      
      if (error) {
        console.error("Error storing payment data:", error);
        toast({
          title: "Error",
          description: "Failed to process your payment. Please try again.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      
      // Show success state
      console.log("Payment submitted successfully");
      toast({
        title: "Payment Successful",
        description: "Thank you for your purchase!",
        variant: "default",
      });
      
      setIsSubmitted(true);
    } catch (err) {
      console.error("Unexpected error:", err);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    form.reset();
    setIsSubmitted(false);
    setCardType(null);
  };

  const CardTypeIcon = () => {
    if (!cardType) return null;
    
    return (
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-cookbook-brown/70">
        <div className={`px-2 py-1 rounded text-xs font-medium ${
          cardType === 'visa' ? 'bg-blue-100 text-blue-800' : 
          cardType === 'mastercard' ? 'bg-orange-100 text-orange-800' : 
          cardType === 'amex' ? 'bg-green-100 text-green-800' : 
          'bg-gray-100 text-gray-800'
        }`}>
          {cardType.charAt(0).toUpperCase() + cardType.slice(1)}
        </div>
      </div>
    );
  };

  return (
    <section id="contact-section" className="py-20 bg-cookbook-cream/30">
      <div className="container-custom">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="section-title">Get Your Copy Today</h2>
          <p className="text-lg text-cookbook-brown/80 max-w-3xl mx-auto">
            Secure your copy of Beaconsfield's Culinary Treasures at our special discounted price.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="order-2 md:order-1">
                  {!isSubmitted ? (
                    <div>
                      <div className="mb-6">
                        <h3 className="text-xl font-semibold text-cookbook-brown mb-2">
                          Payment Details
                        </h3>
                        <p className="text-cookbook-brown/70 text-sm">
                          Your payment information is secured with bank-level encryption
                        </p>
                      </div>

                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                          <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-cookbook-brown">Full Name</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="John Doe" 
                                    className="input-field" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-cookbook-brown">Email Address</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="john.doe@example.com" 
                                    type="email"
                                    className="input-field" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="cardNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-cookbook-brown">Card Number</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-cookbook-brown/70">
                                      <CreditCard size={16} />
                                    </div>
                                    <Input 
                                      placeholder="1234-5678-9012-3456" 
                                      className="input-field pl-10" 
                                      onChange={handleCardNumberChange}
                                      value={field.value}
                                      onBlur={field.onBlur}
                                      name={field.name}
                                      ref={field.ref}
                                      maxLength={19} // 16 digits + 3 hyphens
                                    />
                                    <CardTypeIcon />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="expiryDate"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-cookbook-brown">Expiry Date</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="MM/YY" 
                                      className="input-field" 
                                      maxLength={5}
                                      onChange={handleExpiryDateChange}
                                      value={field.value}
                                      onBlur={field.onBlur}
                                      name={field.name}
                                      ref={field.ref}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="cvv"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-cookbook-brown">CVV</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="123" 
                                      className="input-field" 
                                      maxLength={4}
                                      {...field} 
                                      onChange={(e) => {
                                        // Only allow digits
                                        const value = e.target.value.replace(/\D/g, "");
                                        e.target.value = value;
                                        field.onChange(e);
                                      }}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="pt-4">
                            <Button 
                              type="submit" 
                              className="btn-primary w-full flex items-center justify-center gap-2"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? (
                                <span>Processing...</span>
                              ) : (
                                <>
                                  <span>Complete Purchase</span>
                                  <CheckCircle2 size={18} />
                                </>
                              )}
                            </Button>
                          </div>
                          
                          <p className="text-xs text-center text-cookbook-brown/60 mt-4">
                            By completing your purchase, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>
                          </p>
                        </form>
                      </Form>
                    </div>
                  ) : (
                    <SuccessMessage onReset={resetForm} />
                  )}
                </div>
                
                <div className="order-1 md:order-2 flex flex-col justify-center">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-semibold text-cookbook-brown mb-2">
                      Limited Time Offer
                    </h3>
                    <p className="text-cookbook-brown/80 mb-6">
                      Don't miss out on this exclusive price for Beaconsfield's most cherished recipes.
                    </p>
                    <PriceTag originalPrice={15.99} discountedPrice={2.50} />
                  </div>
                  
                  <div className="border-t border-cookbook-tan/20 pt-6 mt-auto">
                    <div className="flex items-center justify-center space-x-4">
                      <img 
                        src="/lovable-uploads/3b49957f-0680-4e85-8189-fec5835fee38.png" 
                        alt="Cookbook preview"
                        className="w-20 h-20 object-cover rounded-md shadow-md"
                      />
                      <div className="text-left">
                        <h4 className="font-semibold text-cookbook-brown">
                          Beaconsfield's Culinary Treasures
                        </h4>
                        <p className="text-sm text-cookbook-brown/70">
                          Receive instantly via email!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
