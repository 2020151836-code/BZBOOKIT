CREATE TABLE `appointments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`confirmationNumber` varchar(20) NOT NULL,
	`clientId` int NOT NULL,
	`businessId` int NOT NULL,
	`serviceId` int NOT NULL,
	`staffId` int,
	`appointmentDate` timestamp NOT NULL,
	`durationMinutes` int NOT NULL,
	`status` enum('pending','confirmed','cancelled','completed','no_show') NOT NULL DEFAULT 'pending',
	`specialNotes` text,
	`cancellationReason` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `appointments_id` PRIMARY KEY(`id`),
	CONSTRAINT `appointments_confirmationNumber_unique` UNIQUE(`confirmationNumber`)
);
--> statement-breakpoint
CREATE TABLE `businessProfiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ownerId` int NOT NULL,
	`businessName` varchar(255) NOT NULL,
	`description` text,
	`address` text,
	`phone` varchar(20),
	`email` varchar(320),
	`logo` text,
	`operatingHours` text,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `businessProfiles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `chatbotKnowledgeBase` (
	`id` int AUTO_INCREMENT NOT NULL,
	`businessId` int NOT NULL,
	`question` text NOT NULL,
	`answer` text NOT NULL,
	`category` varchar(100),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `chatbotKnowledgeBase_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `chatbotLogs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`businessId` int NOT NULL,
	`clientId` int,
	`sessionId` varchar(255) NOT NULL,
	`question` text NOT NULL,
	`response` text NOT NULL,
	`resolved` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `chatbotLogs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `feedbackRatings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`appointmentId` int NOT NULL,
	`clientId` int NOT NULL,
	`businessId` int NOT NULL,
	`rating` int NOT NULL,
	`serviceQuality` int,
	`punctuality` int,
	`cleanliness` int,
	`comments` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `feedbackRatings_id` PRIMARY KEY(`id`),
	CONSTRAINT `feedbackRatings_appointmentId_unique` UNIQUE(`appointmentId`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`type` enum('booking_confirmation','reminder','cancellation','follow_up','promotional') NOT NULL,
	`title` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`appointmentId` int,
	`isRead` boolean NOT NULL DEFAULT false,
	`sentAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `paymentRecords` (
	`id` int AUTO_INCREMENT NOT NULL,
	`appointmentId` int NOT NULL,
	`clientId` int NOT NULL,
	`businessId` int NOT NULL,
	`amount` int NOT NULL,
	`currency` varchar(3) NOT NULL DEFAULT 'BZD',
	`status` enum('pending','completed','failed','refunded') NOT NULL DEFAULT 'pending',
	`stripePaymentIntentId` varchar(255),
	`stripeRefundId` varchar(255),
	`paymentMethod` varchar(50),
	`receiptUrl` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `paymentRecords_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `services` (
	`id` int AUTO_INCREMENT NOT NULL,
	`businessId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`durationMinutes` int NOT NULL,
	`price` int NOT NULL,
	`category` varchar(100),
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `services_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `staffMembers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`businessId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320),
	`phone` varchar(20),
	`photo` text,
	`specialization` text,
	`availability` text,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `staffMembers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `staffSchedules` (
	`id` int AUTO_INCREMENT NOT NULL,
	`staffId` int NOT NULL,
	`dayOfWeek` int NOT NULL,
	`startTime` time,
	`endTime` time,
	`isAvailable` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `staffSchedules_id` PRIMARY KEY(`id`)
);
