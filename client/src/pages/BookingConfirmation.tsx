import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation, useRoute } from "wouter";
import { CheckCircle, Calendar, Clock, MapPin, User, Download } from "lucide-react";

export default function BookingConfirmation() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/booking/:id/confirmation");

  const appointmentId = params?.id;

  const handleDownloadConfirmation = () => {
    const confirmationText = `
BOOKING CONFIRMATION
====================

Confirmation Number: BZ${Date.now()}
Date: ${new Date().toLocaleDateString()}

Appointment Details:
- Service: Hair Cut & Styling
- Date: December 15, 2024
- Time: 2:00 PM
- Duration: 60 minutes
- Location: Glamour Salon, Downtown

Client Information:
- Name: ${user?.name}
- Email: ${user?.email}

Important:
- Please arrive 10 minutes early
- Cancellations must be made 24 hours in advance
- For questions, contact us at (501) 555-0123

Thank you for booking with us!
    `;

    const element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(confirmationText));
    element.setAttribute("download", "booking-confirmation.txt");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-green-900">Booking Confirmed!</h1>
          <p className="text-green-700 mt-2">Your appointment has been successfully scheduled</p>
        </div>

        <Card className="mb-6 border-green-200">
          <CardHeader className="bg-green-50 border-b border-green-200">
            <CardTitle>Confirmation Number</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-green-600 font-mono">BZ{Date.now()}</p>
              <p className="text-gray-600 text-sm mt-2">Save this number for your records</p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Appointment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <Calendar className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">Date & Time</p>
                <p className="text-gray-600">December 15, 2024 at 2:00 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">Duration</p>
                <p className="text-gray-600">60 minutes</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <User className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">Service</p>
                <p className="text-gray-600">Hair Cut & Styling</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">Location</p>
                <p className="text-gray-600">Glamour Salon, Downtown</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">Important Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-blue-900">
            <p>
              <strong>Please arrive 10 minutes early</strong> to allow time for check-in and payment processing.
            </p>
            <p>
              <strong>Cancellation Policy:</strong> Cancellations must be made at least 24 hours in advance to avoid a cancellation fee.
            </p>
            <p>
              <strong>Contact Information:</strong> If you need to reschedule or have questions, call us at (501) 555-0123 or email support@glamoursalon.bz
            </p>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button
            onClick={handleDownloadConfirmation}
            variant="outline"
            className="flex-1 flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download Confirmation
          </Button>
          <Button
            onClick={() => setLocation("/dashboard")}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Go to Dashboard
          </Button>
        </div>

        <div className="mt-6 text-center">
          <Button
            onClick={() => setLocation("/")}
            variant="ghost"
            className="text-indigo-600 hover:text-indigo-700"
          >
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
