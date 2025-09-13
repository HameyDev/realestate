import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPropertySchema, insertInquirySchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Property routes
  
  // GET /api/properties - Get all properties with optional filtering
  app.get("/api/properties", async (req, res) => {
    try {
      const { status, propertyType, minPrice, maxPrice } = req.query;
      
      const filters: any = {};
      if (status) filters.status = status as string;
      if (propertyType) filters.propertyType = propertyType as string;
      if (minPrice) filters.minPrice = parseInt(minPrice as string);
      if (maxPrice) filters.maxPrice = parseInt(maxPrice as string);
      
      const properties = await storage.getAllProperties(filters);
      res.json(properties);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch properties" });
    }
  });

  // GET /api/properties/:id - Get a specific property
  app.get("/api/properties/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const property = await storage.getProperty(id);
      
      if (!property) {
        return res.status(404).json({ error: "Property not found" });
      }
      
      res.json(property);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch property" });
    }
  });

  // POST /api/properties - Create a new property
  app.post("/api/properties", async (req, res) => {
    try {
      const validatedProperty = insertPropertySchema.parse(req.body);
      const newProperty = await storage.createProperty(validatedProperty);
      res.status(201).json(newProperty);
    } catch (error) {
      res.status(400).json({ error: "Invalid property data" });
    }
  });

  // PUT /api/properties/:id - Update a property
  app.put("/api/properties/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedProperty = insertPropertySchema.partial().parse(req.body);
      const updatedProperty = await storage.updateProperty(id, validatedProperty);
      
      if (!updatedProperty) {
        return res.status(404).json({ error: "Property not found" });
      }
      
      res.json(updatedProperty);
    } catch (error) {
      res.status(400).json({ error: "Invalid property data" });
    }
  });

  // DELETE /api/properties/:id - Delete a property
  app.delete("/api/properties/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteProperty(id);
      
      if (!deleted) {
        return res.status(404).json({ error: "Property not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete property" });
    }
  });

  // POST /api/inquiries - Create a new inquiry
  app.post("/api/inquiries", async (req, res) => {
    try {
      const validatedInquiry = insertInquirySchema.parse(req.body);
      const newInquiry = await storage.createInquiry(validatedInquiry);
      res.status(201).json({ message: "Inquiry sent successfully", inquiry: newInquiry });
    } catch (error) {
      res.status(400).json({ error: "Invalid inquiry data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
