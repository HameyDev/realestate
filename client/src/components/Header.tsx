import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Home, Building, User, Phone } from 'lucide-react';
import { useLocation } from 'wouter';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [, setLocation] = useLocation();

  const scrollToSection = (sectionId: string) => {
    // If we're not on the home page, navigate to home first
    if (window.location.pathname !== '/') {
      setLocation('/');
      // Use setTimeout to ensure the navigation completes before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      setIsMenuOpen(false);
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { icon: Home, label: 'Home', id: 'home', type: 'scroll' },
    { icon: Building, label: 'Properties', id: 'properties', type: 'page' },
    { icon: User, label: 'About', id: 'about', type: 'scroll' },
    { icon: Phone, label: 'Contact', id: 'contact', type: 'scroll' }
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.type === 'page') {
      if (item.id === 'properties') {
        setLocation('/properties');
      }
    } else {
      scrollToSection(item.id);
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Building className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-bold text-foreground font-serif">RWP Builders And Developers</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors hover-elevate px-3 py-2 rounded-md"
                data-testid={`link-${item.id}`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Contact Button & Theme Toggle - Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            <ThemeToggle />
            <Button 
              onClick={() => scrollToSection('contact')}
              data-testid="button-contact-cta"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover-elevate"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-card border-b border-border">
            <nav className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className="flex items-center space-x-3 w-full p-3 rounded-md hover-elevate text-left"
                  data-testid={`mobile-link-${item.id}`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              ))}
              <div className="pt-4">
                <Button 
                  onClick={() => scrollToSection('contact')}
                  className="w-full"
                  data-testid="button-mobile-contact"
                >
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}