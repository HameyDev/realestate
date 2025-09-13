import PropertyCard from './PropertyCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Import property images
import kitchenImage from '@assets/generated_images/Modern_kitchen_property_cc99da7c.png';
import livingRoomImage from '@assets/generated_images/Cozy_living_room_31656cca.png';
import bedroomImage from '@assets/generated_images/Master_bedroom_suite_8b398290.png';
import familyHomeImage from '@assets/generated_images/Family_home_exterior_3c5193dd.png';
import townhouseImage from '@assets/generated_images/Urban_townhouse_81841600.png';

export default function Properties() {
  // TODO: Remove mock functionality - replace with actual property data from API
  const properties = [
    {
      id: "1",
      image: kitchenImage,
      title: "Modern Family Home",
      price: "$750,000",
      location: "Maple Ridge Neighborhood",
      description: "Stunning modern home with gourmet kitchen, open floor plan, and premium finishes throughout. Perfect for entertaining.",
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2800,
      status: 'For Sale' as const
    },
    {
      id: "2", 
      image: livingRoomImage,
      title: "Luxury Townhome",
      price: "$425,000",
      location: "Heritage District",
      description: "Elegant townhome featuring spacious living areas, fireplace, and abundant natural light in desirable location.",
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1950,
      status: 'For Sale' as const
    },
    {
      id: "3",
      image: bedroomImage, 
      title: "Executive Condo",
      price: "$650,000",
      location: "Downtown Core",
      description: "Sophisticated downtown condo with luxurious master suite, modern amenities, and city views.",
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1400,
      status: 'Pending' as const
    },
    {
      id: "4",
      image: familyHomeImage,
      title: "Suburban Retreat",
      price: "$595,000", 
      location: "Greenwood Estates",
      description: "Charming family home on quiet street with large yard, updated interior, and move-in ready condition.",
      bedrooms: 5,
      bathrooms: 3,
      sqft: 3200,
      status: 'For Sale' as const
    },
    {
      id: "5",
      image: townhouseImage,
      title: "Historic Townhouse",
      price: "$485,000",
      location: "Old Town District", 
      description: "Beautifully restored historic townhouse with original character, modern updates, and prime location.",
      bedrooms: 3,
      bathrooms: 2,
      sqft: 2100,
      status: 'For Sale' as const
    },
    {
      id: "6",
      image: kitchenImage,
      title: "Contemporary Villa",
      price: "$950,000",
      location: "Hillside Heights",
      description: "Stunning contemporary home with panoramic views, premium materials, and resort-style backyard.",
      bedrooms: 4,
      bathrooms: 4,
      sqft: 3500,
      status: 'Sold' as const
    }
  ];

  return (
    <section id="properties" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-serif mb-4">
            Featured Properties
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium homes in the most desirable neighborhoods
          </p>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              {...property}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button 
            size="lg"
            variant="outline"
            className="px-8 py-3"
            onClick={() => console.log('View all properties clicked')}
            data-testid="button-view-all-properties"
          >
            View All Properties
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}