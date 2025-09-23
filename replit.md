# Raay Training Center Platform

## Overview

This is a full-stack web application for Raay Training Center, a Saudi Arabian educational institution specializing in cybersecurity, digital transformation, artificial intelligence, and leadership training. The platform provides information about training programs, workshops, consultations, and allows users to register for courses and contact the center.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query for server state management
- **Styling**: Tailwind CSS with custom design system based on brand colors
- **Component Library**: Radix UI primitives with custom styling

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Session Management**: Express sessions with PostgreSQL store
- **Development**: Development server with hot module replacement via Vite

## Key Components

### Database Schema
The application uses PostgreSQL with the following main tables:
- **users**: User authentication and profile information
- **programs**: Training programs with details, pricing, and categories
- **programRegistrations**: Student registrations for programs
- **testimonials**: Customer testimonials and reviews
- **contactMessages**: Contact form submissions
- **teamMembers**: Staff and trainer information
- **trainingTracks**: Educational pathways and learning tracks

### API Structure
RESTful API endpoints for:
- Program management and retrieval
- User registration and contact forms
- Asset management (images, videos)
- Training tracks and testimonials
- Static file serving

### UI Components
- Responsive design optimized for Arabic/RTL content
- Brand-consistent color scheme (navy blue #2a2665, gold #b29567)
- Saudi-themed imagery and cultural elements
- Professional consultation and training visuals

## Data Flow

1. **Client Requests**: React frontend makes API calls to Express backend
2. **Database Operations**: Drizzle ORM handles PostgreSQL interactions
3. **Static Assets**: Images and videos served from server/static directory
4. **Form Submissions**: Contact forms and registrations processed via API endpoints
5. **Response Handling**: TanStack Query manages caching and error states

## External Dependencies

### Core Dependencies
- **Database**: Neon PostgreSQL serverless database
- **Image Assets**: Unsplash API for professional training imagery
- **UI Components**: Radix UI for accessible component primitives
- **Form Handling**: React Hook Form with Zod validation
- **Date Handling**: date-fns for date manipulation

### Development Tools
- **Build**: esbuild for server bundling
- **Type Checking**: TypeScript compiler
- **Database Migrations**: Drizzle Kit for schema management

## Deployment Strategy

### Production Build
- Frontend: Vite builds optimized static assets to `dist/public`
- Backend: esbuild bundles server code to `dist/index.js`
- Assets: Static files served from server directories

### Environment Configuration
- Development: Uses `.env` for database connections
- Production: Requires `DATABASE_URL` environment variable
- Port Configuration: Runs on port 5000 (configurable)

### Deployment Target
- Platform: Replit with autoscale deployment
- Database: PostgreSQL 16 module
- Runtime: Node.js 20

## Changelog

```
Changelog:
- June 17, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```