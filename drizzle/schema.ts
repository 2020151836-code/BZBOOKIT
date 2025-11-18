import { integer, pgEnum, pgTable, text, timestamp, varchar, boolean, decimal, date, time, serial } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = pgTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: serial("id").primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: pgEnum("role", ["user", "admin"])("role").default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Business profiles for beauty businesses.
 * Each business owner can have one business profile.
 */
export const businessProfiles = pgTable("businessProfiles", {
  id: serial("id").primaryKey(),
  ownerId: integer("ownerId").notNull(),
  businessName: varchar("businessName", { length: 255 }).notNull(),
  description: text("description"),
  address: text("address"),
  phone: varchar("phone", { length: 20 }),
  email: varchar("email", { length: 320 }),
  logo: text("logo"),
  operatingHours: text("operatingHours"),
  isActive: boolean("isActive").notNull().default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type BusinessProfile = typeof businessProfiles.$inferSelect;
export type InsertBusinessProfile = typeof businessProfiles.$inferInsert;

/**
 * Services offered by businesses.
 */
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  businessId: integer("businessId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  durationMinutes: integer("durationMinutes").notNull(),
  price: integer("price").notNull(),
  category: varchar("category", { length: 100 }),
  isActive: boolean("isActive").notNull().default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Service = typeof services.$inferSelect;
export type InsertService = typeof services.$inferInsert;

/**
 * Staff members working at businesses.
 */
export const staffMembers = pgTable("staffMembers", {
  id: serial("id").primaryKey(),
  businessId: integer("businessId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 20 }),
  photo: text("photo"),
  specialization: text("specialization"),
  availability: text("availability"),
  isActive: boolean("isActive").notNull().default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type StaffMember = typeof staffMembers.$inferSelect;
export type InsertStaffMember = typeof staffMembers.$inferInsert;

/**
 * Appointments booked by clients.
 */
export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  confirmationNumber: varchar("confirmationNumber", { length: 20 }).notNull().unique(),
  clientId: integer("clientId").notNull(),
  businessId: integer("businessId").notNull(),
  serviceId: integer("serviceId").notNull(),
  staffId: integer("staffId"),
  appointmentDate: timestamp("appointmentDate").notNull(),
  durationMinutes: integer("durationMinutes").notNull(),
  status: pgEnum("status", ["pending", "confirmed", "cancelled", "completed", "no_show"])("status").notNull().default("pending"),
  specialNotes: text("specialNotes"),
  cancellationReason: text("cancellationReason"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Appointment = typeof appointments.$inferSelect;
export type InsertAppointment = typeof appointments.$inferInsert;

/**
 * Feedback and ratings for completed appointments.
 */
export const feedbackRatings = pgTable("feedbackRatings", {
  id: serial("id").primaryKey(),
  appointmentId: integer("appointmentId").notNull().unique(),
  clientId: integer("clientId").notNull(),
  businessId: integer("businessId").notNull(),
  rating: integer("rating").notNull(),
  serviceQuality: integer("serviceQuality"),
  punctuality: integer("punctuality"),
  cleanliness: integer("cleanliness"),
  comments: text("comments"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type FeedbackRating = typeof feedbackRatings.$inferSelect;
export type InsertFeedbackRating = typeof feedbackRatings.$inferInsert;

/**
 * Notifications sent to users.
 */
export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  type: pgEnum("type", ["booking_confirmation", "reminder", "cancellation", "follow_up", "promotional"])("type").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  appointmentId: integer("appointmentId"),
  isRead: boolean("isRead").notNull().default(false),
  sentAt: timestamp("sentAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;

/**
 * Payment records for appointments.
 */
export const paymentRecords = pgTable("paymentRecords", {
  id: serial("id").primaryKey(),
  appointmentId: integer("appointmentId").notNull(),
  clientId: integer("clientId").notNull(),
  businessId: integer("businessId").notNull(),
  amount: integer("amount").notNull(),
  currency: varchar("currency", { length: 3 }).notNull().default("BZD"),
  status: pgEnum("status", ["pending", "completed", "failed", "refunded"])("status").notNull().default("pending"),
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 255 }),
  stripeRefundId: varchar("stripeRefundId", { length: 255 }),
  paymentMethod: varchar("paymentMethod", { length: 50 }),
  receiptUrl: text("receiptUrl"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type PaymentRecord = typeof paymentRecords.$inferSelect;
export type InsertPaymentRecord = typeof paymentRecords.$inferInsert;

/**
 * Chatbot knowledge base for AI assistance.
 */
export const chatbotKnowledgeBase = pgTable("chatbotKnowledgeBase", {
  id: serial("id").primaryKey(),
  businessId: integer("businessId").notNull(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: varchar("category", { length: 100 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type ChatbotKnowledgeBase = typeof chatbotKnowledgeBase.$inferSelect;
export type InsertChatbotKnowledgeBase = typeof chatbotKnowledgeBase.$inferInsert;

/**
 * Chatbot interaction logs.
 */
export const chatbotLogs = pgTable("chatbotLogs", {
id: serial("id").primaryKey(),
  businessId: integer("businessId").notNull(),
  clientId: integer("clientId"),
  sessionId: varchar("sessionId", { length: 255 }).notNull(),
  question: text("question").notNull(),
  response: text("response").notNull(),
  resolved: boolean("resolved").notNull().default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ChatbotLog = typeof chatbotLogs.$inferSelect;
export type InsertChatbotLog = typeof chatbotLogs.$inferInsert;

/**
 * Staff schedules for availability management.
 */
export const staffSchedules = pgTable("staffSchedules", {
  id: serial("id").primaryKey(),
  staffId: integer("staffId").notNull(),
  dayOfWeek: integer("dayOfWeek").notNull(),
  startTime: time("startTime"),
  endTime: time("endTime"),
  isAvailable: boolean("isAvailable").notNull().default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type StaffSchedule = typeof staffSchedules.$inferSelect;
export type InsertStaffSchedule = typeof staffSchedules.$inferInsert;

/**
 * Relations definitions for better query experience.
 */
export const usersRelations = relations(users, ({ many }) => ({
  businessProfiles: many(businessProfiles),
  appointments: many(appointments),
  feedbackRatings: many(feedbackRatings),
  notifications: many(notifications),
  paymentRecords: many(paymentRecords),
}));

export const businessProfilesRelations = relations(businessProfiles, ({ one, many }) => ({
  owner: one(users, {
    fields: [businessProfiles.ownerId],
    references: [users.id],
  }),
  services: many(services),
  staffMembers: many(staffMembers),
  appointments: many(appointments),
  feedbackRatings: many(feedbackRatings),
  paymentRecords: many(paymentRecords),
  chatbotKnowledgeBase: many(chatbotKnowledgeBase),
  chatbotLogs: many(chatbotLogs),
}));

export const servicesRelations = relations(services, ({ one, many }) => ({
  business: one(businessProfiles, {
    fields: [services.businessId],
    references: [businessProfiles.id],
  }),
  appointments: many(appointments),
}));

export const staffMembersRelations = relations(staffMembers, ({ one, many }) => ({
  business: one(businessProfiles, {
    fields: [staffMembers.businessId],
    references: [businessProfiles.id],
  }),
  appointments: many(appointments),
  schedules: many(staffSchedules),
}));

export const appointmentsRelations = relations(appointments, ({ one }) => ({
  client: one(users, {
    fields: [appointments.clientId],
    references: [users.id],
  }),
  business: one(businessProfiles, {
    fields: [appointments.businessId],
    references: [businessProfiles.id],
  }),
  service: one(services, {
    fields: [appointments.serviceId],
    references: [services.id],
  }),
  staff: one(staffMembers, {
    fields: [appointments.staffId],
    references: [staffMembers.id],
  }),
  feedback: one(feedbackRatings, {
    fields: [appointments.id],
    references: [feedbackRatings.appointmentId],
  }),
  payment: one(paymentRecords, {
    fields: [appointments.id],
    references: [paymentRecords.appointmentId],
  }),
}));

export const feedbackRatingsRelations = relations(feedbackRatings, ({ one }) => ({
  appointment: one(appointments, {
    fields: [feedbackRatings.appointmentId],
    references: [appointments.id],
  }),
  client: one(users, {
    fields: [feedbackRatings.clientId],
    references: [users.id],
  }),
  business: one(businessProfiles, {
    fields: [feedbackRatings.businessId],
    references: [businessProfiles.id],
  }),
}));

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
  appointment: one(appointments, {
    fields: [notifications.appointmentId],
    references: [appointments.id],
  }),
}));

export const paymentRecordsRelations = relations(paymentRecords, ({ one }) => ({
  appointment: one(appointments, {
    fields: [paymentRecords.appointmentId],
    references: [appointments.id],
  }),
  client: one(users, {
    fields: [paymentRecords.clientId],
    references: [users.id],
  }),
  business: one(businessProfiles, {
    fields: [paymentRecords.businessId],
    references: [businessProfiles.id],
  }),
}));

export const chatbotKnowledgeBaseRelations = relations(chatbotKnowledgeBase, ({ one }) => ({
  business: one(businessProfiles, {
    fields: [chatbotKnowledgeBase.businessId],
    references: [businessProfiles.id],
  }),
}));

export const chatbotLogsRelations = relations(chatbotLogs, ({ one }) => ({
  business: one(businessProfiles, {
    fields: [chatbotLogs.businessId],
    references: [businessProfiles.id],
  }),
  client: one(users, {
    fields: [chatbotLogs.clientId],
    references: [users.id],
  }),
}));

export const staffSchedulesRelations = relations(staffSchedules, ({ one }) => ({
  staff: one(staffMembers, {
    fields: [staffSchedules.staffId],
    references: [staffMembers.id],
  }),
}));