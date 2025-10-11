# SAETA - Production & Live Streaming Company Website

## Overview

SAETA is a premium production and live streaming company website built with React, Express, and TypeScript. The application showcases professional audiovisual services including 4K streaming, cinematic content production, brand experiences, and social media management. 

The website features a sophisticated, Accenture-inspired design with continuous-flow aesthetic, translucent containers with backdrop-blur effects, and premium micro-animations. The design emphasizes a seamless, single-canvas experience rather than traditional sectioned panels, creating a fluid, high-end corporate presence.

**Key Design Features:**
- Continuous flow layout without harsh divisions between sections
- Translucent containers with backdrop-blur for premium depth
- Auto-rotating carousels with smooth transitions (testimonials, valor 360)
- Micro-animations: icons that scale/rotate on hover, list items with interactive states, gradient overlays
- Dark mode with red/violet/black color palette (0° hue primary/red, 270° hue accent/violet)

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
- Single-page layout with smooth scroll navigation to sections: Hero, Services, Gallery, About, Team (Conócenos), Clients Carousel, Contact
- Continuous-flow design with translucent containers instead of rigid cards
- Responsive design with mobile-first approach
- Intersection Observer API via react-intersection-observer for scroll-triggered animations
- Premium micro-interactions throughout (icon rotations, list item scaling, gradient overlays on hover)

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

## Recent Changes (October 11, 2025)

### Management Meeting Updates - Major Feature Additions
- **Video Demo Reel**: Added prominent video demo reel section at top of page with play button overlay and professional production imagery
- **Why Hire Us Section**: Created "¿Por qué contratar nuestros servicios?" showcasing 6 key differentiators (expert team, cutting-edge tech, certified processes, measurable results, 24/7 support, strategic partners)
- **Valor 360 Carousel**: Implemented auto-rotating "Nuestro valor 360" carousel with 3 transformation case studies demonstrating SAETA's business impact
- **Commercial Partners Section**: Added "Nuestros aliados comerciales" displaying strategic partnerships with Meta, Google, Sony, and OpenAI with grayscale-to-color hover effects
- **Color Scheme Update**: Changed from magenta/purple to red/violet/black palette (primary: 0° red, accent: 270° violet) for stronger corporate presence
- **Section Reordering**: Optimized flow to Video Demo → Hero → Why Hire Us → Valor 360 → Services → Gallery → About → Commercial Partners → Team → Clients → Contact

### Content & Copy Updates
- **Hero Stats**: Updated from equipment-focused ("Multicámara HD/4K", "Video Aéreo", "Soporte Técnico") to service-focused ("Streaming / Producción", "Marketing / Diseño", "IA Solutions")
- **Services Enhancement**: Changed "Cámaras XDCAM/NXCAM" to "Operadores profesionales" emphasizing human expertise
- **Sector Reordering**: Reorganized target sectors to: Industria, Corporativo, Servicios Profesionales, Gobierno
- **Trust & Continuity**: Converted from paragraph text to bullet points, added 2 new features (Soporte Técnico Integral, Gestión de Proyectos), added "Capacitación constante" to technological renewal
- **ISO Certification**: Updated status to "En proceso de certificación Gestión de Calidad ISO 9001:2015"

### Premium Redesign - Accenture-Inspired Continuous Flow
- **Design Transformation**: Replaced rigid Card components with translucent containers using backdrop-blur and subtle borders for a premium, flowing aesthetic
- **Auto-Rotating Carousels**: Multiple carousels (Testimonials/Clients, Valor 360) with 4-6 second intervals, smooth transitions, navigation arrows, and dot indicators
- **Micro-Animations Overhaul**:
  - Icons scale and rotate on hover with spring animations
  - List item bullets grow on hover with smooth transitions
  - Service cards have layered gradient overlays that appear on hover
  - Gallery images use controlled zoom with Framer Motion
  - Dynamic shadow effects with primary/accent color tints
- **Continuous Flow**: Eliminated harsh section divisions by using consistent translucent backgrounds, subtle borders (border/30 opacity), and seamless transitions between sections
- **Visual Depth**: Multi-layer gradient system (from-card/50 to-transparent) creates depth without solid backgrounds

### Technical Improvements
- Enhanced motion design with Framer Motion whileHover and transition controls
- Added scroll-based animations with useScroll hook for parallax-like effects
- Implemented hover state tracking for controlled animations (hoveredId state)
- All interactive elements maintain data-testid attributes for e2e testing
- Responsive gap utilities on all flex containers with justify-between/around for layout resilience