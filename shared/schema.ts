import { pgTable, text, serial, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name"),
  email: text("email"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Programs table
export const programs = pgTable("programs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  duration: text("duration").notNull(),
  price: integer("price").notNull(),
  category: text("category").notNull(),
  image: text("image").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Program registrations
export const programRegistrations = pgTable("program_registrations", {
  id: serial("id").primaryKey(),
  programId: integer("program_id").notNull(),
  userId: integer("user_id"),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Testimonials table
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  comment: text("comment").notNull(),
  rating: integer("rating").notNull(),
  image: text("image").notNull(),
  approved: boolean("approved").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Contact messages
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  userId: integer("user_id"),
  status: text("status").default("new"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Team members
export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  bio: text("bio").notNull(),
  image: text("image").notNull(),
  linkedin: text("linkedin"),
  twitter: text("twitter"),
  website: text("website"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Training tracks
export const trainingTracks = pgTable("training_tracks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  features: text("features").array().notNull(),
  iconName: text("icon_name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  contactMessages: many(contactMessages),
  programRegistrations: many(programRegistrations)
}));

export const programsRelations = relations(programs, ({ many }) => ({
  registrations: many(programRegistrations)
}));

export const programRegistrationsRelations = relations(programRegistrations, ({ one }) => ({
  program: one(programs, {
    fields: [programRegistrations.programId],
    references: [programs.id],
  }),
  user: one(users, {
    fields: [programRegistrations.userId],
    references: [users.id],
  }),
}));

export const contactMessagesRelations = relations(contactMessages, ({ one }) => ({
  user: one(users, {
    fields: [contactMessages.userId],
    references: [users.id],
  }),
}));

// Schemas for insert operations
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  fullName: true,
  email: true,
});

export const insertProgramSchema = createInsertSchema(programs).pick({
  title: true,
  description: true,
  duration: true,
  price: true,
  category: true,
  image: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).pick({
  name: true,
  title: true,
  comment: true,
  rating: true,
  image: true,
  approved: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  phone: true,
  subject: true,
  message: true,
  userId: true,
});

export const insertProgramRegistrationSchema = createInsertSchema(programRegistrations).pick({
  programId: true,
  userId: true,
  name: true,
  email: true,
  phone: true,
  status: true,
});

export const insertTeamMemberSchema = createInsertSchema(teamMembers).pick({
  name: true,
  title: true,
  bio: true,
  image: true,
  linkedin: true,
  twitter: true,
  website: true,
});

export const insertTrainingTrackSchema = createInsertSchema(trainingTracks).pick({
  title: true,
  description: true,
  features: true,
  iconName: true,
});

// Types for entities
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Program = typeof programs.$inferSelect;
export type InsertProgram = z.infer<typeof insertProgramSchema>;

export type ProgramRegistration = typeof programRegistrations.$inferSelect;
export type InsertProgramRegistration = z.infer<typeof insertProgramRegistrationSchema>;

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;

export type TeamMember = typeof teamMembers.$inferSelect;
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;

export type TrainingTrack = typeof trainingTracks.$inferSelect;
export type InsertTrainingTrack = z.infer<typeof insertTrainingTrackSchema>;