
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-cookbook-cream/30">
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <ContactForm />
      </main>

      <footer className="bg-cookbook-brown text-white py-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-semibold">Beaconsfield Cookbook</h3>
            </div>
            <div>
              <p className="text-sm text-white/70">
                © {new Date().getFullYear()} Beaconsfield Community. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
