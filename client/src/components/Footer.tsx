import { Building, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Properties', id: 'properties' },
    { label: 'About Us', id: 'about' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Building className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold font-serif">Premier Real Estate</span>
            </div>
            <p className="text-primary-foreground/80 mb-6 max-w-md">
              Your trusted partner in finding the perfect home. With over 15 years of experience, 
              we deliver exceptional service and outstanding results in luxury residential real estate.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-primary-foreground/80">
                <Phone className="h-4 w-4 mr-2" />
                <a href="tel:+15551234567" className="hover:text-primary-foreground transition-colors">
                  (555) 123-4567
                </a>
              </div>
              <div className="flex items-center text-primary-foreground/80">
                <Mail className="h-4 w-4 mr-2" />
                <a href="mailto:hello@premierrealestate.com" className="hover:text-primary-foreground transition-colors">
                  hello@premierrealestate.com
                </a>
              </div>
              <div className="flex items-center text-primary-foreground/80">
                <MapPin className="h-4 w-4 mr-2" />
                <span>123 Main Street, Downtown District</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors hover-elevate p-1 rounded -m-1"
                    data-testid={`footer-link-${link.id}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>Residential Sales</li>
              <li>Property Listings</li>
              <li>Market Analysis</li>
              <li>Investment Consulting</li>
              <li>Property Management</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-primary-foreground/60 text-sm">
            © {currentYear} Premier Real Estate. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <button className="text-primary-foreground/60 hover:text-primary-foreground/80 transition-colors text-sm hover-elevate p-1 rounded -m-1">
              Privacy Policy
            </button>
            <button className="text-primary-foreground/60 hover:text-primary-foreground/80 transition-colors text-sm hover-elevate p-1 rounded -m-1">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}