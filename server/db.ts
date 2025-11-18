import { eq, and, desc, gte, lte, like } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser, users,
  InsertAppointment, appointments,
  InsertService, services,
  InsertFeedbackRating, feedbackRatings,
  InsertNotification, notifications,
  InsertPaymentRecord, paymentRecords,
  InsertBusinessProfile, businessProfiles,
  InsertStaffMember, staffMembers,
  InsertChatbotLog, chatbotLogs,
  InsertChatbotKnowledgeBase, chatbotKnowledgeBase,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Appointment queries
export async function createAppointment(appointment: InsertAppointment) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(appointments).values(appointment);
  return result;
}

export async function getAppointmentById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(appointments).where(eq(appointments.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getClientAppointments(clientId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(appointments).where(eq(appointments.clientId, clientId));
}

export async function getBusinessAppointments(businessId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(appointments).where(eq(appointments.businessId, businessId));
}

export async function updateAppointmentStatus(id: number, status: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(appointments).set({ status: status as any }).where(eq(appointments.id, id));
}

export async function updateAppointment(id: number, data: Partial<InsertAppointment>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(appointments).set(data).where(eq(appointments.id, id));
}

// Service queries
export async function getBusinessServices(businessId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(services).where(eq(services.businessId, businessId));
}

export async function createService(service: InsertService) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(services).values(service);
}

export async function updateService(id: number, data: Partial<InsertService>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(services).set(data).where(eq(services.id, id));
}

export async function getServiceById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(services).where(eq(services.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Feedback queries
export async function createFeedback(feedback: InsertFeedbackRating) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(feedbackRatings).values(feedback);
}

export async function getBusinessFeedback(businessId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(feedbackRatings).where(eq(feedbackRatings.businessId, businessId));
}

export async function getAppointmentFeedback(appointmentId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(feedbackRatings).where(eq(feedbackRatings.appointmentId, appointmentId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Notification queries
export async function createNotification(notification: InsertNotification) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(notifications).values(notification);
}

export async function getUserNotifications(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(notifications).where(eq(notifications.userId, userId)).orderBy(desc(notifications.createdAt));
}

export async function markNotificationAsRead(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(notifications).set({ isRead: true }).where(eq(notifications.id, id));
}

// Payment queries
export async function createPayment(payment: InsertPaymentRecord) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(paymentRecords).values(payment);
}

export async function getAppointmentPayment(appointmentId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(paymentRecords).where(eq(paymentRecords.appointmentId, appointmentId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updatePayment(id: number, data: Partial<InsertPaymentRecord>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(paymentRecords).set(data).where(eq(paymentRecords.id, id));
}

// Business profile queries
export async function getBusinessProfile(ownerId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(businessProfiles).where(eq(businessProfiles.ownerId, ownerId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getBusinessProfileById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(businessProfiles).where(eq(businessProfiles.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createBusinessProfile(profile: InsertBusinessProfile) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(businessProfiles).values(profile);
}

export async function updateBusinessProfile(id: number, data: Partial<InsertBusinessProfile>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(businessProfiles).set(data).where(eq(businessProfiles.id, id));
}

// Staff member queries
export async function getBusinessStaff(businessId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(staffMembers).where(eq(staffMembers.businessId, businessId));
}

export async function createStaffMember(staff: InsertStaffMember) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(staffMembers).values(staff);
}

export async function getStaffMemberById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(staffMembers).where(eq(staffMembers.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Chatbot queries
export async function createChatbotLog(log: InsertChatbotLog) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(chatbotLogs).values(log);
}

export async function getBusinessChatbotKnowledge(businessId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(chatbotKnowledgeBase).where(eq(chatbotKnowledgeBase.businessId, businessId));
}

export async function createChatbotKnowledge(knowledge: InsertChatbotKnowledgeBase) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(chatbotKnowledgeBase).values(knowledge);
}

export async function getBusinessChatbotLogs(businessId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(chatbotLogs).where(eq(chatbotLogs.businessId, businessId));
}
