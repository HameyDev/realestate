import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, Star } from 'lucide-react';

// ✅ Use an online placeholder image instead of missing local file
const heroImage =
  "/assets/hero1.png";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="mb-6 flex items-center justify-center space-x-2 text-yellow-300">
          <Star className="h-5 w-5 fill-current" />
          <Star className="h-5 w-5 fill-current" />
          <Star className="h-5 w-5 fill-current" />
          <Star className="h-5 w-5 fill-current" />
          <Star className="h-5 w-5 fill-current" />
          <span className="text-sm font-medium">Trusted by 500+ Happy Clients</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 font-serif">
          Find Your Dream Home
        </h1>

        <p className="text-xl sm:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
          Experience luxury living with our curated collection of premium properties. 
          Professional service, exceptional results.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button
            size="lg"
            onClick={() => scrollToSection('properties')}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 text-lg"
            data-testid="button-view-properties"
          >
            View Properties
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollToSection('contact')}
            className="border-white text-white hover:bg-white/10 backdrop-blur-sm px-8 py-3 text-lg"
            data-testid="button-contact-agent"
          >
            Contact Agent
          </Button>
        </div>

        <div className="flex items-center justify-center space-x-2 text-gray-300">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">Serving Greater Metropolitan Area</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
}
