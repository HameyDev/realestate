# Real Estate Website - replit.md

## Overview

This is a premium real estate website application built with modern web technologies. The platform enables users to browse luxury properties, view detailed property information, and contact real estate professionals. The application features a professional design inspired by premium real estate platforms like Zillow and Redfin, focusing on trust, visual appeal, and effective property showcasing.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side application is built using React with TypeScript and follows a component-based architecture. The UI is built with shadcn/ui components and styled using Tailwind CSS with a custom design system that supports both light and dark themes. The application uses a file-based routing system with wouter for navigation between the home page, properties listing, and individual property detail pages.

### Component Structure
- **Layout Components**: Header with navigation, Hero section, Footer
- **Property Components**: PropertyCard for listings, Properties grid for showcase
- **Page Components**: Home page composition, PropertiesPage for browsing, PropertyDetailPage for individual properties
- **UI Components**: Complete shadcn/ui component library for consistent design patterns

### State Management
The application uses TanStack React Query for server state management, providing caching, background updates, and optimistic updates for property data. Local component state is managed with React hooks for form inputs and UI interactions.

### Build System
Vite is used as the build tool and development server, configured with React plugin and custom aliases for clean import paths. The build outputs static assets to the dist/public directory for production deployment.

### Backend Architecture
The server is built with Express.js following a RESTful API pattern. The application uses a modular route structure with dedicated handlers for property-related operations including CRUD operations with filtering capabilities.

### API Design
- **GET /api/properties** - Retrieve all properties with optional filtering by status, property type, and price range
- **GET /api/properties/:id** - Retrieve specific property details
- **POST /api/properties** - Create new property (with validation)
- **PUT/DELETE endpoints** - For property management (defined in interface)

### Data Storage
The application uses Drizzle ORM with PostgreSQL for data persistence. The schema defines users and properties tables with comprehensive property information including pricing, location, specifications, and media. A memory storage implementation is provided for development with sample data initialization.

### Database Schema
- **Properties table**: Comprehensive property data including title, description, pricing, location details, specifications (bedrooms, bathrooms, square footage), images array, amenities, and status tracking
- **Users table**: Basic user authentication structure
- **Validation**: Zod schemas for runtime type checking and API validation

### Design System
The application implements a sophisticated design system with:
- **Color Palette**: Professional navy/gold theme with comprehensive light/dark mode support
- **Typography**: Inter font family with Playfair Display accents for elegant hierarchy
- **Component Variants**: Consistent button styles, card layouts, and interactive elements
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## External Dependencies

### Core Framework Dependencies
- **React 18** with TypeScript for component-based UI development
- **Express.js** for REST API server implementation
- **Vite** for fast development and optimized production builds

### Database and ORM
- **Drizzle ORM** for type-safe database operations and schema management
- **@neondatabase/serverless** for PostgreSQL database connectivity
- **PostgreSQL** as the primary database (configured via Drizzle)

### UI and Styling
- **Tailwind CSS** for utility-first styling and responsive design
- **shadcn/ui** component library built on Radix UI primitives
- **Radix UI** for accessible, unstyled component primitives
- **class-variance-authority** for component variant management

### State Management and Data Fetching
- **TanStack React Query** for server state management and caching
- **React Hook Form** with Hookform Resolvers for form state management
- **Zod** for runtime schema validation and type inference

### Development and Build Tools
- **TypeScript** for static typing across the entire application
- **ESBuild** for fast server-side bundling in production
- **PostCSS** with Autoprefixer for CSS processing

### Utility Libraries
- **date-fns** for date manipulation and formatting
- **clsx** and **tailwind-merge** for conditional CSS class management
- **wouter** for lightweight client-side routing
- **Lucide React** for consistent iconography

### Additional Features
- **embla-carousel-react** for image carousels in property details
- **connect-pg-simple** for PostgreSQL session storage
- **cmdk** for command palette functionality