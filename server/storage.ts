import { type User, type InsertUser, type Property, type InsertProperty, type Inquiry, type InsertInquiry } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Property methods
  getProperty(id: string): Promise<Property | undefined>;
  getAllProperties(filters?: { status?: string; propertyType?: string; minPrice?: number; maxPrice?: number }): Promise<Property[]>;
  createProperty(property: InsertProperty): Promise<Property>;
  updateProperty(id: string, property: Partial<InsertProperty>): Promise<Property | undefined>;
  deleteProperty(id: string): Promise<boolean>;
  
  // Inquiry methods
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private properties: Map<string, Property>;
  private inquiries: Map<string, Inquiry>;

  constructor() {
    this.users = new Map();
    this.properties = new Map();
    this.inquiries = new Map();
    
    // Initialize with some sample properties
    this.initializeSampleProperties();
  }

  private async initializeSampleProperties() {
    // Sample property data with the generated images
    const sampleProperties: InsertProperty[] = [
      {
        title: "Modern Family Home",
        description: "Stunning modern home with gourmet kitchen, open floor plan, and premium finishes throughout. Perfect for entertaining with spacious living areas and a beautiful backyard oasis.",
        price: "750000",
        address: "123 Maple Ridge Drive",
        city: "Springfield",
        state: "CA",
        zipCode: "90210",
        propertyType: "house",
        status: "For Sale",
        bedrooms: 4,
        bathrooms: "3.0",
        squareFootage: 2800,
        lotSize: "0.25",
        yearBuilt: 2018,
        images: ["/assets/a.png"],
        amenities: ["Central Air", "Hardwood Floors", "Granite Countertops", "Walk-in Closet"],
        features: ["Open Floor Plan", "Gourmet Kitchen", "Master Suite", "Two-Car Garage"],
        isActive: true
      },
      {
        title: "Luxury Townhome",
        description: "Elegant townhome featuring spacious living areas, fireplace, and abundant natural light in desirable Heritage District location.",
        price: "425000",
        address: "456 Heritage Lane",
        city: "Springfield",
        state: "CA",
        zipCode: "90211",
        propertyType: "townhouse",
        status: "For Sale",
        bedrooms: 3,
        bathrooms: "2.0",
        squareFootage: 1950,
        lotSize: "0.1",
        yearBuilt: 2015,
        images: ["/assets/b.png"],
        amenities: ["Fireplace", "Patio", "Storage", "Laundry Room"],
        features: ["Living Room Fireplace", "Private Patio", "Updated Kitchen"],
        isActive: true
      },
      {
        title: "Executive Condo",
        description: "Sophisticated downtown condo with luxurious master suite, modern amenities, and city views.",
        price: "650000",
        address: "789 Downtown Plaza",
        city: "Springfield",
        state: "CA",
        zipCode: "90212",
        propertyType: "condo",
        status: "Pending",
        bedrooms: 2,
        bathrooms: "2.0",
        squareFootage: 1400,
        yearBuilt: 2020,
        images: ["/assets/c.png"],
        amenities: ["City Views", "Balcony", "Gym Access", "Concierge"],
        features: ["Floor-to-Ceiling Windows", "Modern Appliances", "Master Suite"],
        isActive: true
      },
      {
        title: "Suburban Retreat",
        description: "Charming family home on quiet street with large yard, updated interior, and move-in ready condition.",
        price: "595000",
        address: "321 Greenwood Estate",
        city: "Springfield",
        state: "CA", 
        zipCode: "90213",
        propertyType: "house",
        status: "For Sale",
        bedrooms: 5,
        bathrooms: "3.0",
        squareFootage: 3200,
        lotSize: "0.5",
        yearBuilt: 2010,
        images: ["/assets/d.png"],
        amenities: ["Large Yard", "Updated Kitchen", "Hardwood Floors", "Three-Car Garage"],
        features: ["Spacious Layout", "Family Room", "Formal Dining", "Home Office"],
        isActive: true
      },
      {
        title: "Historic Townhouse",
        description: "Beautifully restored historic townhouse with original character, modern updates, and prime Old Town location.",
        price: "485000",
        address: "654 Old Town Square",
        city: "Springfield",
        state: "CA",
        zipCode: "90214",
        propertyType: "townhouse",
        status: "For Sale",
        bedrooms: 3,
        bathrooms: "2.0",
        squareFootage: 2100,
        lotSize: "0.08",
        yearBuilt: 1925,
        images: ["/assets/e.png"],
        amenities: ["Historic Character", "Updated Systems", "Original Details", "Courtyard"],
        features: ["Restored Original Features", "Modern Kitchen", "Exposed Brick"],
        isActive: true
      },
      {
        title: "Contemporary Villa",
        description: "Stunning contemporary home with panoramic views, premium materials, and resort-style backyard.",
        price: "950000",
        address: "987 Hillside Heights",
        city: "Springfield", 
        state: "CA",
        zipCode: "90215",
        propertyType: "house",
        status: "Sold",
        bedrooms: 4,
        bathrooms: "4.0",
        squareFootage: 3500,
        lotSize: "0.75",
        yearBuilt: 2021,
        images: ["/assets/b.png"],
        amenities: ["Panoramic Views", "Pool", "Spa", "Wine Cellar"],
        features: ["Gourmet Kitchen", "Master Suite", "Home Theater", "Guest House"],
        isActive: true
      }
    ];

    for (const prop of sampleProperties) {
      await this.createProperty(prop);
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProperty(id: string): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async getAllProperties(filters?: { status?: string; propertyType?: string; minPrice?: number; maxPrice?: number }): Promise<Property[]> {
    let properties = Array.from(this.properties.values()).filter(prop => prop.isActive);
    
    if (filters) {
      if (filters.status) {
        properties = properties.filter(prop => prop.status === filters.status);
      }
      if (filters.propertyType) {
        properties = properties.filter(prop => prop.propertyType === filters.propertyType);
      }
      if (filters.minPrice) {
        properties = properties.filter(prop => parseFloat(prop.price) >= filters.minPrice!);
      }
      if (filters.maxPrice) {
        properties = properties.filter(prop => parseFloat(prop.price) <= filters.maxPrice!);
      }
    }
    
    return properties;
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const id = randomUUID();
    const now = new Date();
    const property: Property = { 
      ...insertProperty,
      id,
      status: insertProperty.status || "For Sale",
      bedrooms: insertProperty.bedrooms ?? null,
      bathrooms: insertProperty.bathrooms ?? null,
      squareFootage: insertProperty.squareFootage ?? null,
      lotSize: insertProperty.lotSize ?? null,
      yearBuilt: insertProperty.yearBuilt ?? null,
      images: insertProperty.images ?? [],
      amenities: insertProperty.amenities ?? [],
      features: insertProperty.features ?? [],
      isActive: insertProperty.isActive ?? true,
      createdAt: now,
      updatedAt: now
    };
    this.properties.set(id, property);
    return property;
  }

  async updateProperty(id: string, updateData: Partial<InsertProperty>): Promise<Property | undefined> {
    const existing = this.properties.get(id);
    if (!existing) return undefined;
    
    const updated: Property = {
      ...existing,
      ...updateData,
      updatedAt: new Date()
    };
    
    this.properties.set(id, updated);
    return updated;
  }

  async deleteProperty(id: string): Promise<boolean> {
    return this.properties.delete(id);
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = randomUUID();
    const now = new Date();
    const inquiry: Inquiry = {
      ...insertInquiry,
      phone: insertInquiry.phone ?? null,
      propertyId: insertInquiry.propertyId ?? null,
      id,
      createdAt: now
    };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }
}

export const storage = new MemStorage();
