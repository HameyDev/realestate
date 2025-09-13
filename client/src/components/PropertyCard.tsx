import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Bed, Bath, Square, Eye } from 'lucide-react';

interface PropertyCardProps {
  id: string;
  image: string;
  title: string;
  price: string;
  location: string;
  description: string;
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number;
  status?: 'For Sale' | 'Sold' | 'Pending';
}

export default function PropertyCard({
  id,
  image,
  title,
  price,
  location,
  description,
  bedrooms,
  bathrooms,
  sqft,
  status = 'For Sale'
}: PropertyCardProps) {
  
  const handleViewDetails = () => {
    console.log(`View details for property ${id}: ${title}`);
    // TODO: Remove mock functionality - implement actual property details modal/page
  };

  return (
    <Card className="group hover-elevate transition-all duration-300 overflow-hidden" data-testid={`card-property-${id}`}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <Badge 
            variant={status === 'For Sale' ? 'default' : status === 'Sold' ? 'secondary' : 'destructive'}
            className="font-semibold"
            data-testid={`status-${id}`}
          >
            {status}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <Badge variant="outline" className="bg-black/50 text-white border-white/20 backdrop-blur-sm">
            <Eye className="h-3 w-3 mr-1" />
            View Details
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-foreground font-serif" data-testid={`title-${id}`}>
            {title}
          </h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary" data-testid={`price-${id}`}>
              {price}
            </div>
          </div>
        </div>
        
        <div className="flex items-center text-muted-foreground mb-3" data-testid={`location-${id}`}>
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{location}</span>
        </div>
        
        {(bedrooms || bathrooms || sqft) && (
          <div className="flex items-center space-x-4 mb-4 text-sm text-muted-foreground">
            {bedrooms && (
              <div className="flex items-center">
                <Bed className="h-4 w-4 mr-1" />
                <span>{bedrooms} bed</span>
              </div>
            )}
            {bathrooms && (
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-1" />
                <span>{bathrooms} bath</span>
              </div>
            )}
            {sqft && (
              <div className="flex items-center">
                <Square className="h-4 w-4 mr-1" />
                <span>{sqft.toLocaleString()} sqft</span>
              </div>
            )}
          </div>
        )}
        
        <p className="text-muted-foreground text-sm leading-relaxed" data-testid={`description-${id}`}>
          {description}
        </p>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <Button 
          className="w-full" 
          onClick={handleViewDetails}
          data-testid={`button-view-details-${id}`}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}