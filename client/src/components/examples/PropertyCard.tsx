import PropertyCard from '../PropertyCard';
import kitchenImage from '@attached_assets/generated_images/Modern_kitchen_property_cc99da7c.png';

export default function PropertyCardExample() {
  return (
    <div className="p-6 max-w-sm">
      <PropertyCard
        id="1"
        image={kitchenImage}
        title="Modern Family Home"
        price="$750,000"
        location="Downtown District"
        description="Beautiful family home featuring updated kitchen, spacious living areas, and premium finishes throughout."
        bedrooms={4}
        bathrooms={3}
        sqft={2800}
        status="For Sale"
      />
    </div>
  );
}