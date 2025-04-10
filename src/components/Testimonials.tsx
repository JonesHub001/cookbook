
import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const Testimonials = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const testimonials = [
    {
      name: "Tonya M.",
      quote: "This cookbook transformed our family meals. The recipes are straightforward and every dish has become a household favorite!",
      rating: 5,
      image: "/lovable-uploads/Tonya M.jpg"
    },
    {
      name: "Julie C",
      quote: "As a Beaconsfield resident, I love how this cookbook captures our community's culinary heritage. The seasonal recipes are perfect for gatherings!",
      rating: 5,
      image: "/lovable-uploads/JulieC.jpg"
    },
    {
      name: "Sindie C.",
      quote: "I've tried many cookbooks, but this one stands out. The recipes are approachable yet impressive - perfect for both everyday cooking and special occasions.",
      rating: 5,
      image: "/lovable-uploads/sindie.jpg"
    },
  ];

  const renderStars = (rating: number) => {
    return Array(rating)
      .fill(0)
      .map((_, i) => (
        <Star key={i} className="w-5 h-5 fill-cookbook-terracotta text-cookbook-terracotta" />
      ));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-cookbook-cream/30">
      <div className="container-custom">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="section-title">What Our Community Says</h2>
          <p className="text-lg text-cookbook-brown/80 max-w-3xl mx-auto">
            Join the many satisfied home cooks who've brought Beaconsfield's finest recipes to their tables.
          </p>
        </div>

        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className={`card border border-cookbook-tan/20 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col ${mounted ? 'animate-fade-in' : 'opacity-0'}`}
              style={{ animationDelay: `${0.2 * (index + 1)}s` }}
            >
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-cookbook-cream shadow-sm"
                />
                <div>
                  <h3 className="font-semibold text-cookbook-brown">{testimonial.name}</h3>
                  <div className="flex">{renderStars(testimonial.rating)}</div>
                </div>
              </div>
              <p className="text-cookbook-brown/80 italic flex-1 leading-relaxed">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>

        {/* Mobile carousel view */}
        <div className="md:hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <div 
                    className={`card border border-cookbook-tan/20 bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-5 flex flex-col h-full ${mounted ? 'animate-fade-in' : 'opacity-0'}`}
                    style={{ animationDelay: `${0.2 * (index + 1)}s` }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-cookbook-cream shadow-sm"
                      />
                      <div>
                        <h3 className="font-semibold text-cookbook-brown">{testimonial.name}</h3>
                        <div className="flex">{renderStars(testimonial.rating)}</div>
                      </div>
                    </div>
                    <p className="text-cookbook-brown/80 italic flex-1 leading-relaxed">"{testimonial.quote}"</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-4">
              <CarouselPrevious className="relative static translate-y-0 left-0 top-0 h-8 w-8 rounded-full bg-cookbook-terracotta/80 text-white hover:bg-cookbook-terracotta" />
              <CarouselNext className="relative static translate-y-0 right-0 top-0 h-8 w-8 rounded-full bg-cookbook-terracotta/80 text-white hover:bg-cookbook-terracotta" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
