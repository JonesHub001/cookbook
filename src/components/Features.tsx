
import { Check } from "lucide-react";

const Features = () => {
  const featuresList = [
    {
      title: "Over 100 Recipes",
      description: "Discover a wide variety of dishes, from appetizers to desserts, with easy-to-follow instructions.",
      icon: <Check className="w-6 h-6 text-cookbook-terracotta" />,
    },
    {
      title: "Local Favorites",
      description: "Experience the authentic tastes of Beaconsfield with recipes handed down through generations.",
      icon: <Check className="w-6 h-6 text-cookbook-terracotta" />,
    },
    {
      title: "Seasonal Specials",
      description: "Find dishes perfectly suited for every season, using locally-sourced ingredients.",
      icon: <Check className="w-6 h-6 text-cookbook-terracotta" />,
    },
    {
      title: "Dietary Options",
      description: "Enjoy a variety of recipes catering to different dietary preferences and requirements.",
      icon: <Check className="w-6 h-6 text-cookbook-terracotta" />,
    },
  ];

  return (
    <section className="py-20 bg-cookbook-cream/50">
      <div className="container-custom">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="section-title">Why You'll Love Our Cookbook</h2>
          <p className="text-lg text-cookbook-brown/80 max-w-3xl mx-auto">
            More than just recipes - it's a culinary journey through Beaconsfield's rich food heritage.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresList.map((feature, index) => (
            <div 
              key={index} 
              className="card bg-white border border-cookbook-tan/20 animate-fade-in"
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              <div className="bg-cookbook-cream/50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-cookbook-brown mb-2">{feature.title}</h3>
              <p className="text-cookbook-brown/80">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="relative h-[300px] md:h-[400px] max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <img 
              src="https://images.unsplash.com/photo-1556040220-4096d522378d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
              alt="Cookbook interior"
              className="absolute top-0 left-0 w-[70%] h-full object-cover rounded-lg shadow-xl"
            />
            <img 
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
              alt="Food dish"
              className="absolute bottom-10 right-0 w-[40%] h-[60%] object-cover rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
