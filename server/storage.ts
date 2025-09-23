import { 
  users, programs, testimonials, contactMessages, teamMembers, trainingTracks, programRegistrations,
  type User, type InsertUser, 
  type Program, type InsertProgram,
  type Testimonial, type InsertTestimonial,
  type ContactMessage, type InsertContactMessage,
  type TeamMember, type InsertTeamMember,
  type TrainingTrack, type InsertTrainingTrack,
  type ProgramRegistration, type InsertProgramRegistration
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Program operations
  getPrograms(): Promise<Program[]>;
  getProgramsByCategory(category: string): Promise<Program[]>;
  getProgram(id: number): Promise<Program | undefined>;
  createProgram(program: InsertProgram): Promise<Program>;
  
  // Testimonial operations
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // Contact operations
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  
  // Team members operations
  getTeamMembers(): Promise<TeamMember[]>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;
  
  // Training tracks operations
  getTrainingTracks(): Promise<TrainingTrack[]>;
  createTrainingTrack(track: InsertTrainingTrack): Promise<TrainingTrack>;
  
  // Program registration operations
  createProgramRegistration(registration: InsertProgramRegistration): Promise<ProgramRegistration>;
  getProgramRegistrations(programId: number): Promise<ProgramRegistration[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  // Program operations
  async getPrograms(): Promise<Program[]> {
    return await db.select().from(programs);
  }
  
  async getProgramsByCategory(category: string): Promise<Program[]> {
    return await db.select().from(programs).where(eq(programs.category, category));
  }
  
  async getProgram(id: number): Promise<Program | undefined> {
    const [program] = await db.select().from(programs).where(eq(programs.id, id));
    return program;
  }
  
  async createProgram(program: InsertProgram): Promise<Program> {
    const [newProgram] = await db
      .insert(programs)
      .values(program)
      .returning();
    return newProgram;
  }
  
  // Testimonial operations
  async getTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials);
  }
  
  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [newTestimonial] = await db
      .insert(testimonials)
      .values(testimonial)
      .returning();
    return newTestimonial;
  }
  
  // Contact operations
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [newMessage] = await db
      .insert(contactMessages)
      .values(message)
      .returning();
    return newMessage;
  }
  
  // Team members operations
  async getTeamMembers(): Promise<TeamMember[]> {
    return await db.select().from(teamMembers);
  }
  
  async createTeamMember(member: InsertTeamMember): Promise<TeamMember> {
    const [newMember] = await db
      .insert(teamMembers)
      .values(member)
      .returning();
    return newMember;
  }
  
  // Training tracks operations
  async getTrainingTracks(): Promise<TrainingTrack[]> {
    return await db.select().from(trainingTracks);
  }
  
  async createTrainingTrack(track: InsertTrainingTrack): Promise<TrainingTrack> {
    const [newTrack] = await db
      .insert(trainingTracks)
      .values(track)
      .returning();
    return newTrack;
  }
  
  // Program registration operations
  async createProgramRegistration(registration: InsertProgramRegistration): Promise<ProgramRegistration> {
    const [newRegistration] = await db
      .insert(programRegistrations)
      .values(registration)
      .returning();
    return newRegistration;
  }
  
  async getProgramRegistrations(programId: number): Promise<ProgramRegistration[]> {
    return await db
      .select()
      .from(programRegistrations)
      .where(eq(programRegistrations.programId, programId));
  }
}

export const storage = new DatabaseStorage();
