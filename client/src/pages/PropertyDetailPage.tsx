import { useState } from 'react';
import { useParams, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Calendar, 
  Home, 
  Phone, 
  Mail,
  Send,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import type { Property } from '@shared/schema';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: `Hi, I'm interested in ${id ? 'this property' : 'learning more'}. Please contact me with more information.`
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const { data: property, isLoading, error } = useQuery<Property>({
    queryKey: ['/api/properties', id],
    queryFn: async () => {
      const res = await fetch(`/api/properties/${id}`);
      if (!res.ok) {
        throw new Error(`Property not found: ${res.status}`);
      }
      return res.json();
    },
    enabled: !!id,
    refetchOnWindowFocus: false
  });

  const handleImageNavigation = (direction: 'prev' | 'next') => {
    if (!property?.images?.length) return;
    
    if (direction === 'prev') {
      setCurrentImageIndex(prev => 
        prev === 0 ? property.images.length - 1 : prev - 1
      );
    } else {
      setCurrentImageIndex(prev => 
        prev === property.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const inquiryData = {
        propertyId: property?.id,
        name: contactForm.name,
        email: contactForm.email,
        phone: contactForm.phone || null,
        message: contactForm.message
      };

      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inquiryData),
      });

      if (!response.ok) {
        throw new Error('Failed to send inquiry');
      }

      toast({
        title: "Message Sent!",
        description: "Thank you for your inquiry. We'll get back to you within 24 hours.",
      });

      // Reset form
      setContactForm({
        name: '',
        email: '',
        phone: '',
        message: `Hi, I'm interested in ${property?.title || 'this property'}. Please contact me with more information.`
      });

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send your inquiry. Please try again.",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded mb-4 w-32"></div>
            <div className="aspect-[16/9] bg-muted rounded-lg mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-8 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </div>
              <div className="h-64 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen pt-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="p-8 text-center">
            <CardContent>
              <h2 className="text-2xl font-bold text-destructive mb-4">Property Not Found</h2>
              <p className="text-muted-foreground mb-6">The property you're looking for doesn't exist or has been removed.</p>
              <Button onClick={() => setLocation('/properties')} data-testid="button-back-to-properties">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Properties
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button 
          variant="outline" 
          onClick={() => setLocation('/properties')}
          className="mb-6"
          data-testid="button-back"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Properties
        </Button>

        {/* Image Gallery */}
        <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-8 group">
          <img 
            src={property.images?.[currentImageIndex] || '/placeholder-property.jpg'} 
            alt={`${property.title} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
            data-testid="property-main-image"
          />
          
          {/* Image Navigation */}
          {property.images && property.images.length > 1 && (
            <>
              <button
                onClick={() => handleImageNavigation('prev')}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover-elevate"
                data-testid="button-prev-image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={() => handleImageNavigation('next')}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover-elevate"
                data-testid="button-next-image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              
              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {property.images?.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                    data-testid={`button-image-${index}`}
                  />
                ))}
              </div>
            </>
          )}
          
          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <Badge 
              variant={property.status === 'For Sale' ? 'default' : property.status === 'Sold' ? 'secondary' : 'destructive'}
              className="font-semibold"
            >
              {property.status}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground font-serif mb-2" data-testid="property-title">
                      {property.title}
                    </h1>
                    <div className="flex items-center text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span data-testid="property-address">{property.address}, {property.city}, {property.state} {property.zipCode}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary" data-testid="property-price">
                      ${parseInt(property.price).toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1)}
                    </div>
                  </div>
                </div>

                {/* Property Stats */}
                <div className="flex items-center space-x-6 mb-6 text-sm">
                  {property.bedrooms && (
                    <div className="flex items-center">
                      <Bed className="h-4 w-4 mr-1" />
                      <span>{property.bedrooms} bed</span>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1" />
                      <span>{parseFloat(property.bathrooms)} bath</span>
                    </div>
                  )}
                  {property.squareFootage && (
                    <div className="flex items-center">
                      <Square className="h-4 w-4 mr-1" />
                      <span>{property.squareFootage.toLocaleString()} sqft</span>
                    </div>
                  )}
                  {property.yearBuilt && (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Built {property.yearBuilt}</span>
                    </div>
                  )}
                  {property.lotSize && (
                    <div className="flex items-center">
                      <Home className="h-4 w-4 mr-1" />
                      <span>{parseFloat(property.lotSize)} acres</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Description</h3>
                  <p className="text-muted-foreground leading-relaxed" data-testid="property-description">
                    {property.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Features & Amenities */}
            {((property.features && property.features.length > 0) || (property.amenities && property.amenities.length > 0)) && (
              <Card>
                <CardHeader>
                  <CardTitle>Features & Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {property.features && property.features.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3">Features</h4>
                        <ul className="space-y-2">
                          {property.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-sm">
                              <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {property.amenities && property.amenities.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3">Amenities</h4>
                        <ul className="space-y-2">
                          {property.amenities.map((amenity, index) => (
                            <li key={index} className="flex items-center text-sm">
                              <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                              {amenity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Contact Form Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Interested in this property?</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={contactForm.name}
                      onChange={handleInputChange}
                      required
                      data-testid="input-contact-name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={contactForm.email}
                      onChange={handleInputChange}
                      required
                      data-testid="input-contact-email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={contactForm.phone}
                      onChange={handleInputChange}
                      data-testid="input-contact-phone"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={contactForm.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      data-testid="textarea-contact-message"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting}
                    data-testid="button-send-inquiry"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Inquiry
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>

                {/* Contact Info */}
                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="font-semibold mb-3">Direct Contact</h4>
                  <div className="space-y-2">
                    <a 
                      href="tel:+15551234567" 
                      className="flex items-center text-sm hover:text-foreground transition-colors hover-elevate p-2 rounded -m-2"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      (555) 123-4567
                    </a>
                    <a 
                      href="mailto:hello@premierrealestate.com" 
                      className="flex items-center text-sm hover:text-foreground transition-colors hover-elevate p-2 rounded -m-2"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      hello@premierrealestate.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}