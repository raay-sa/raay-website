import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { assets } from "./static/assets";
import { 
  insertContactMessageSchema, insertProgramRegistrationSchema 
} from "@shared/schema";
import { tracks } from './data/tracks';
import { programs } from './data/programs';
import { team } from './data/team';
import { testimonials } from './data/testimonials';
import path from "path";
import express from "express";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for the Raay Training Center
  
  // Serve static files like videos
  app.use('/videos', express.static(path.join(process.cwd(), 'server/static/public/videos')));
  
  // Get all assets for the site
  app.get('/api/assets', (req, res) => {
    res.json(assets);
  });
  
  // Get training tracks
  app.get('/api/tracks', async (req, res) => {
    try {
      const dbTracks = await storage.getTrainingTracks();
      
      if (dbTracks.length > 0) {
        res.json({
          message: 'Success',
          data: dbTracks
        });
      } else {
        // If no tracks exist in the database, seed with initial data
        seedTrainingTracks();
        
        res.json({
          message: 'Success',
          data: tracks
        });
      }
    } catch (error) {
      console.error('Error fetching tracks:', error);
      res.status(500).json({
        message: 'حدث خطأ أثناء جلب المسارات التدريبية',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });
  
  // Get training programs
  app.get('/api/programs', async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      
      // Check if programs exist in the database
      let dbPrograms = category 
        ? await storage.getProgramsByCategory(category)
        : await storage.getPrograms();
        
      if (dbPrograms.length > 0) {
        res.json({
          message: 'Success',
          data: dbPrograms
        });
      } else {
        // If no programs exist in the database, seed with initial data
        await seedPrograms();
        
        // Filter by category if specified
        const filteredPrograms = category 
          ? programs.filter(program => program.category === category)
          : programs;
        
        res.json({
          message: 'Success',
          data: filteredPrograms
        });
      }
    } catch (error) {
      console.error('Error fetching programs:', error);
      res.status(500).json({
        message: 'حدث خطأ أثناء جلب البرامج التدريبية',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });
  
  // Get program by ID
  app.get('/api/programs/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'معرف البرنامج غير صالح' });
      }
      
      const program = await storage.getProgram(id);
      
      if (!program) {
        return res.status(404).json({ message: 'البرنامج غير موجود' });
      }
      
      res.json({
        message: 'Success',
        data: program
      });
    } catch (error) {
      console.error('Error fetching program:', error);
      res.status(500).json({
        message: 'حدث خطأ أثناء جلب البرنامج',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });
  
  // Get team members
  app.get('/api/team', async (req, res) => {
    try {
      const dbTeamMembers = await storage.getTeamMembers();
      
      if (dbTeamMembers.length > 0) {
        res.json({
          message: 'Success',
          data: dbTeamMembers
        });
      } else {
        // If no team members exist in the database, seed with initial data
        await seedTeamMembers();
        
        res.json({
          message: 'Success',
          data: team
        });
      }
    } catch (error) {
      console.error('Error fetching team members:', error);
      res.status(500).json({
        message: 'حدث خطأ أثناء جلب فريق العمل',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });
  
  // Get testimonials
  app.get('/api/testimonials', async (req, res) => {
    try {
      const dbTestimonials = await storage.getTestimonials();
      
      if (dbTestimonials.length > 0) {
        res.json({
          message: 'Success',
          data: dbTestimonials
        });
      } else {
        // If no testimonials exist in the database, seed with initial data
        await seedTestimonials();
        
        res.json({
          message: 'Success',
          data: testimonials
        });
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      res.status(500).json({
        message: 'حدث خطأ أثناء جلب آراء المتدربين',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });
  
  // Register for a program
  app.post('/api/programs/register', async (req, res) => {
    try {
      const validationResult = insertProgramRegistrationSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({
          message: 'بيانات التسجيل غير صالحة',
          errors: validationResult.error.errors
        });
      }
      
      const registration = await storage.createProgramRegistration(validationResult.data);
      
      res.status(201).json({
        message: 'تم التسجيل في البرنامج بنجاح',
        data: registration,
        success: true
      });
    } catch (error) {
      console.error('Error registering for program:', error);
      res.status(500).json({
        message: 'حدث خطأ أثناء التسجيل في البرنامج',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });
  
  // Contact form submission
  app.post('/api/contact', async (req, res) => {
    try {
      const validationResult = insertContactMessageSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({
          message: 'يرجى تعبئة جميع الحقول المطلوبة',
          errors: validationResult.error.errors
        });
      }
      
      const contactMessage = await storage.createContactMessage(validationResult.data);
      
      res.status(201).json({
        message: 'تم إرسال رسالتك بنجاح، سنتواصل معك قريباً',
        data: contactMessage,
        success: true
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      res.status(500).json({
        message: 'حدث خطأ أثناء إرسال النموذج',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Seed functions
async function seedPrograms() {
  try {
    for (const program of programs) {
      await storage.createProgram({
        title: program.title,
        description: program.description,
        duration: program.duration,
        price: program.price,
        category: program.category,
        image: program.image
      });
    }
    console.log('Programs seeded successfully');
  } catch (error) {
    console.error('Error seeding programs:', error);
  }
}

async function seedTeamMembers() {
  try {
    for (const member of team) {
      await storage.createTeamMember({
        name: member.name,
        title: member.title,
        bio: member.bio,
        image: member.image,
        linkedin: member.linkedin,
        twitter: member.twitter,
        website: member.website
      });
    }
    console.log('Team members seeded successfully');
  } catch (error) {
    console.error('Error seeding team members:', error);
  }
}

async function seedTestimonials() {
  try {
    for (const testimonial of testimonials) {
      await storage.createTestimonial({
        name: testimonial.name,
        title: testimonial.title,
        comment: testimonial.comment,
        rating: testimonial.rating,
        image: testimonial.image,
        approved: true
      });
    }
    console.log('Testimonials seeded successfully');
  } catch (error) {
    console.error('Error seeding testimonials:', error);
  }
}

async function seedTrainingTracks() {
  try {
    const trackIcons = {
      'FaShieldAlt': 'shield',
      'FaDigitalTachograph': 'digital',
      'FaBrain': 'brain',
      'FaChartPie': 'chart',
      'FaBuilding': 'building',
      'FaExclamationTriangle': 'warning'
    };
    
    for (const track of tracks) {
      const iconName = trackIcons[track.icon.displayName] || track.icon.displayName || 'default';
      
      await storage.createTrainingTrack({
        title: track.title,
        description: track.description,
        features: track.features,
        iconName: iconName
      });
    }
    console.log('Training tracks seeded successfully');
  } catch (error) {
    console.error('Error seeding training tracks:', error);
  }
}
