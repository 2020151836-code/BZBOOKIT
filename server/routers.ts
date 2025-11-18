import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { generateConfirmationNumber } from "./utils";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Appointments
  appointments: router({
    create: protectedProcedure
      .input(z.object({
        businessId: z.number(),
        serviceId: z.number(),
        staffId: z.number().optional(),
        appointmentDate: z.date(),
        durationMinutes: z.number(),
        specialNotes: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const confirmationNumber = generateConfirmationNumber();
        return db.createAppointment({
          confirmationNumber,
          clientId: ctx.user.id,
          businessId: input.businessId,
          serviceId: input.serviceId,
          staffId: input.staffId,
          appointmentDate: input.appointmentDate,
          durationMinutes: input.durationMinutes,
          specialNotes: input.specialNotes,
          status: "pending",
        });
      }),

    getById: protectedProcedure
      .input(z.number())
      .query(({ input }) => db.getAppointmentById(input)),

    getClientAppointments: protectedProcedure
      .query(({ ctx }) => db.getClientAppointments(ctx.user.id)),

    getBusinessAppointments: protectedProcedure
      .input(z.number())
      .query(({ input }) => db.getBusinessAppointments(input)),

    updateStatus: protectedProcedure
      .input(z.object({
        appointmentId: z.number(),
        status: z.enum(["pending", "confirmed", "cancelled", "completed", "no_show"]),
      }))
      .mutation(({ input }) => db.updateAppointmentStatus(input.appointmentId, input.status)),

    cancel: protectedProcedure
      .input(z.object({
        appointmentId: z.number(),
        cancellationReason: z.string(),
      }))
      .mutation(({ input }) => db.updateAppointment(input.appointmentId, {
        status: "cancelled",
        cancellationReason: input.cancellationReason,
      })),

    update: protectedProcedure
      .input(z.object({
        appointmentId: z.number(),
        appointmentDate: z.date().optional(),
        durationMinutes: z.number().optional(),
        specialNotes: z.string().optional(),
      }))
      .mutation(({ input }) => {
        const { appointmentId, ...data } = input;
        return db.updateAppointment(appointmentId, data);
      }),
  }),

  // Services
  services: router({
    getByBusiness: protectedProcedure
      .input(z.number())
      .query(({ input }) => db.getBusinessServices(input)),

    create: protectedProcedure
      .input(z.object({
        businessId: z.number(),
        name: z.string(),
        description: z.string().optional(),
        durationMinutes: z.number(),
        price: z.number(),
        category: z.string().optional(),
      }))
      .mutation(({ input }) => db.createService(input)),

    update: protectedProcedure
      .input(z.object({
        serviceId: z.number(),
        name: z.string().optional(),
        description: z.string().optional(),
        durationMinutes: z.number().optional(),
        price: z.number().optional(),
        category: z.string().optional(),
      }))
      .mutation(({ input }) => {
        const { serviceId, ...data } = input;
        return db.updateService(serviceId, data);
      }),

    getById: protectedProcedure
      .input(z.number())
      .query(({ input }) => db.getServiceById(input)),
  }),

  // Feedback
  feedback: router({
    create: protectedProcedure
      .input(z.object({
        appointmentId: z.number(),
        businessId: z.number(),
        rating: z.number().min(1).max(5),
        serviceQuality: z.number().min(1).max(5).optional(),
        punctuality: z.number().min(1).max(5).optional(),
        cleanliness: z.number().min(1).max(5).optional(),
        comments: z.string().optional(),
      }))
      .mutation(({ input, ctx }) => db.createFeedback({
        appointmentId: input.appointmentId,
        clientId: ctx.user.id,
        businessId: input.businessId,
        rating: input.rating,
        serviceQuality: input.serviceQuality,
        punctuality: input.punctuality,
        cleanliness: input.cleanliness,
        comments: input.comments,
      })),

    getByBusiness: protectedProcedure
      .input(z.number())
      .query(({ input }) => db.getBusinessFeedback(input)),

    getByAppointment: protectedProcedure
      .input(z.number())
      .query(({ input }) => db.getAppointmentFeedback(input)),
  }),

  // Notifications
  notifications: router({
    getUserNotifications: protectedProcedure
      .query(({ ctx }) => db.getUserNotifications(ctx.user.id)),

    create: protectedProcedure
      .input(z.object({
        userId: z.number(),
        type: z.enum(["booking_confirmation", "reminder", "cancellation", "follow_up", "promotional"]),
        title: z.string(),
        message: z.string(),
        appointmentId: z.number().optional(),
      }))
      .mutation(({ input }) => db.createNotification(input)),

    markAsRead: protectedProcedure
      .input(z.number())
      .mutation(({ input }) => db.markNotificationAsRead(input)),
  }),

  // Payments
  payments: router({
    create: protectedProcedure
      .input(z.object({
        appointmentId: z.number(),
        businessId: z.number(),
        amount: z.number(),
        paymentMethod: z.string(),
      }))
      .mutation(({ input, ctx }) => db.createPayment({
        appointmentId: input.appointmentId,
        clientId: ctx.user.id,
        businessId: input.businessId,
        amount: input.amount,
        paymentMethod: input.paymentMethod,
        status: "pending",
      })),

    getByAppointment: protectedProcedure
      .input(z.number())
      .query(({ input }) => db.getAppointmentPayment(input)),

    updateStatus: protectedProcedure
      .input(z.object({
        paymentId: z.number(),
        status: z.enum(["pending", "completed", "failed", "refunded"]),
      }))
      .mutation(({ input }) => db.updatePayment(input.paymentId, { status: input.status as any })),
  }),

  // Business Profile
  business: router({
    getProfile: protectedProcedure
      .query(({ ctx }) => db.getBusinessProfile(ctx.user.id)),

    getById: protectedProcedure
      .input(z.number())
      .query(({ input }) => db.getBusinessProfileById(input)),

    create: protectedProcedure
      .input(z.object({
        businessName: z.string(),
        description: z.string().optional(),
        address: z.string().optional(),
        phone: z.string().optional(),
        email: z.string().optional(),
        logo: z.string().optional(),
        operatingHours: z.string().optional(),
      }))
      .mutation(({ input, ctx }) => db.createBusinessProfile({
        ownerId: ctx.user.id,
        ...input,
      })),

    update: protectedProcedure
      .input(z.object({
        businessId: z.number(),
        businessName: z.string().optional(),
        description: z.string().optional(),
        address: z.string().optional(),
        phone: z.string().optional(),
        email: z.string().optional(),
        logo: z.string().optional(),
        operatingHours: z.string().optional(),
      }))
      .mutation(({ input }) => {
        const { businessId, ...data } = input;
        return db.updateBusinessProfile(businessId, data);
      }),
  }),

  // Staff
  staff: router({
    getByBusiness: protectedProcedure
      .input(z.number())
      .query(({ input }) => db.getBusinessStaff(input)),

    create: protectedProcedure
      .input(z.object({
        businessId: z.number(),
        name: z.string(),
        email: z.string().optional(),
        phone: z.string().optional(),
        photo: z.string().optional(),
        specialization: z.string().optional(),
      }))
      .mutation(({ input }) => db.createStaffMember(input)),

    getById: protectedProcedure
      .input(z.number())
      .query(({ input }) => db.getStaffMemberById(input)),
  }),

  // Chatbot
  chatbot: router({
    getKnowledgeBase: publicProcedure
      .input(z.number())
      .query(({ input }) => db.getBusinessChatbotKnowledge(input)),

    addKnowledge: protectedProcedure
      .input(z.object({
        businessId: z.number(),
        question: z.string(),
        answer: z.string(),
        category: z.string().optional(),
      }))
      .mutation(({ input }) => db.createChatbotKnowledge(input)),

    logInteraction: publicProcedure
      .input(z.object({
        businessId: z.number(),
        clientId: z.number().optional(),
        sessionId: z.string(),
        question: z.string(),
        response: z.string(),
        resolved: z.boolean().optional(),
      }))
      .mutation(({ input }) => db.createChatbotLog(input)),

    getLogs: protectedProcedure
      .input(z.number())
      .query(({ input }) => db.getBusinessChatbotLogs(input)),
  }),
});

export type AppRouter = typeof appRouter;
