import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cookbook-cream to-cookbook-tan opacity-40 z-0"></div>
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="flex-1 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-cookbook-brown leading-tight">
              Beaconsfield's
              <br />
              <span className="text-cookbook-terracotta">Culinary Treasures</span>
            </h1>
            <p className="text-xl mb-8 text-cookbook-brown max-w-lg">
              A curated collection of cherished recipes from the heart of Beaconsfield's community. Discover the flavors that bring us together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-primary" size="lg" onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}>
                Get Your Copy
              </Button>
            </div>
          </div>
          <div className="flex-1 relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative w-full h-[400px] md:h-[500px]">
              <img 
                src="https://images.unsplash.com/photo-1544971621-42832765912a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                alt="Beaconsfield Cookbook"
                className="absolute top-0 left-0 w-[80%] h-[80%] object-cover rounded-lg shadow-2xl z-10"
              />
              <img 
                src="https://images.unsplash.com/photo-1505576633757-0ac1084af824?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                alt="Food from the cookbook"
                className="absolute bottom-0 right-0 w-[60%] h-[60%] object-cover rounded-lg shadow-2xl z-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
