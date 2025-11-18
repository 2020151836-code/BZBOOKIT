/**
 * Generate a unique confirmation number for appointments
 */
export function generateConfirmationNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `BZ${timestamp}${random}`;
}

/**
 * Calculate average rating from feedback
 */
export function calculateAverageRating(ratings: number[]): number {
  if (ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  return Math.round((sum / ratings.length) * 10) / 10;
}

/**
 * Format currency for BZD
 */
export function formatBZD(amount: number): string {
  return `BZ$${(amount / 100).toFixed(2)}`;
}

/**
 * Generate a unique session ID for chatbot
 */
export function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Check if appointment is within business hours
 */
export function isWithinBusinessHours(
  appointmentDate: Date,
  operatingHours: any
): boolean {
  // This is a placeholder - implement based on your business hours format
  return true;
}

/**
 * Check for appointment conflicts
 */
export function hasConflict(
  existingAppointments: any[],
  newAppointmentStart: Date,
  newAppointmentDuration: number
): boolean {
  const newEnd = new Date(newAppointmentStart.getTime() + newAppointmentDuration * 60000);

  return existingAppointments.some(apt => {
    const aptStart = new Date(apt.appointmentDate);
    const aptEnd = new Date(aptStart.getTime() + apt.durationMinutes * 60000);

    return (
      (newAppointmentStart < aptEnd && newEnd > aptStart) ||
      (newAppointmentStart >= aptStart && newAppointmentStart < aptEnd) ||
      (newEnd > aptStart && newEnd <= aptEnd)
    );
  });
}
