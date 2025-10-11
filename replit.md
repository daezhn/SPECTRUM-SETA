# SAETA - Production & Live Streaming Company Website

## Overview

SAETA is a premium production and live streaming company website built with React, Express, and TypeScript. The application showcases professional audiovisual services including 4K streaming, cinematic content production, brand experiences, and social media management. The website features a modern, dark-themed design inspired by corporate aesthetics with emphasis on visual impact and smooth interactions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR (Hot Module Replacement)
- Single Page Application (SPA) with client-side routing via Wouter (lightweight React Router alternative)

**UI Component Strategy**
- Shadcn/ui component library with Radix UI primitives for accessible, customizable components
- Tailwind CSS for utility-first styling with custom theme configuration
- Design system based on "new-york" style variant with dark mode as primary theme
- Framer Motion for animations and smooth transitions throughout the site
- Custom color palette featuring magenta/purple brand colors with neutral backgrounds

**State Management & Data Fetching**
- TanStack Query (React Query) for server state management and API caching
- React Hook Form with Zod validation for form handling
- No global state management library (component-level state with React hooks)

**Layout & Sections**
- Single-page layout with smooth scroll navigation to sections: Hero, Services, Gallery, About, Contact
- Responsive design with mobile-first approach
- Intersection Observer API via react-intersection-observer for scroll-triggered animations

### Backend Architecture

**Server Framework**
- Express.js server serving both API endpoints and static frontend assets
- Development mode uses Vite middleware for HMR
- Production mode serves pre-built static files

**API Design**
- RESTful API with JSON responses
- Contact form submission endpoint (`POST /api/contact`)
- Admin endpoint for retrieving submissions (`GET /api/contact`)
- Centralized error handling middleware

**Data Persistence Strategy**
- Currently using in-memory storage (MemStorage class) for contact form submissions
- Storage abstraction layer (IStorage interface) allows easy swapping to database implementation
- Schema-first approach with Drizzle ORM and Zod for validation
- Database schema defined for PostgreSQL (ready for migration from in-memory to persistent storage)

**Why In-Memory Storage**: The application is designed with a database-ready schema but currently uses in-memory storage, likely for development/demo purposes. The storage layer implements an interface pattern making it trivial to swap to a PostgreSQL implementation without changing application logic.

### External Dependencies

**UI & Styling**
- Radix UI primitives (@radix-ui/*) - Accessible, unstyled UI components
- Tailwind CSS - Utility-first CSS framework
- Framer Motion - Animation library
- class-variance-authority & clsx - Component variant and class name utilities

**Forms & Validation**
- React Hook Form - Form state management
- Zod - TypeScript-first schema validation
- @hookform/resolvers - Connects Zod schemas to React Hook Form

**Database (Configured but Optional)**
- Drizzle ORM - Type-safe database toolkit
- @neondatabase/serverless - Neon serverless PostgreSQL driver
- drizzle-zod - Generates Zod schemas from Drizzle tables
- Note: Database configuration exists but application works without database connection

**Development Tools**
- TypeScript - Type safety across stack
- ESBuild - Fast JavaScript bundler for production builds
- Replit-specific plugins for development environment integration

**Why This Stack**: The combination provides type safety end-to-end (TypeScript + Zod + Drizzle), excellent developer experience (Vite + HMR), and production-ready component library (Shadcn/ui + Radix) while maintaining flexibility to add database persistence when needed.