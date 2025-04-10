
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SuccessMessageProps {
  onReset: () => void;
}

const SuccessMessage = ({ onReset }: SuccessMessageProps) => {
  return (
    <div className="text-center py-8 px-4 animate-fade-in">
      <div className="bg-cookbook-sage/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check className="w-8 h-8 text-cookbook-sage" />
      </div>
      <h3 className="text-2xl font-bold text-cookbook-brown mb-3">Thank You!</h3>
      <p className="text-cookbook-brown/80 mb-6 max-w-md mx-auto">
        Payment request has been submitted successfully. You will soon receive your copy!.
      </p>
      <Button onClick={onReset} className="btn-secondary">
        Return to Form
      </Button>
    </div>
  );
};

export default SuccessMessage;
