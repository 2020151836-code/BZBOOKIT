import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function ClientBookingForm() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [businessId, setBusinessId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [specialNotes, setSpecialNotes] = useState("");

  const createAppointmentMutation = trpc.appointments.create.useMutation({
    onSuccess: (data) => {
      toast.success("Booking created successfully!");
      setLocation("/booking/confirmation");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create booking");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!businessId || !serviceId || !appointmentDate || !appointmentTime) {
      toast.error("Please fill in all required fields");
      return;
    }

    const appointmentDateTime = new Date(`${appointmentDate}T${appointmentTime}`);
    
    createAppointmentMutation.mutate({
      businessId: parseInt(businessId),
      serviceId: parseInt(serviceId),
      appointmentDate: appointmentDateTime,
      durationMinutes: 60,
      specialNotes: specialNotes || undefined,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 py-12">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Book Your Appointment</CardTitle>
            <CardDescription>
              Select your preferred service, date, and time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Business Selection */}
              <div className="space-y-2">
                <Label htmlFor="business">Select Business *</Label>
                <Select value={businessId} onValueChange={setBusinessId}>
                  <SelectTrigger id="business">
                    <SelectValue placeholder="Choose a beauty business" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Glamour Salon</SelectItem>
                    <SelectItem value="2">Beauty Boutique</SelectItem>
                    <SelectItem value="3">Spa Wellness Center</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Service Selection */}
              <div className="space-y-2">
                <Label htmlFor="service">Select Service *</Label>
                <Select value={serviceId} onValueChange={setServiceId}>
                  <SelectTrigger id="service">
                    <SelectValue placeholder="Choose a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Hair Cut & Styling - BZ$45</SelectItem>
                    <SelectItem value="2">Manicure - BZ$30</SelectItem>
                    <SelectItem value="3">Pedicure - BZ$35</SelectItem>
                    <SelectItem value="4">Facial Treatment - BZ$60</SelectItem>
                    <SelectItem value="5">Massage - BZ$75</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date Selection */}
              <div className="space-y-2">
                <Label htmlFor="date">Appointment Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              {/* Time Selection */}
              <div className="space-y-2">
                <Label htmlFor="time">Appointment Time *</Label>
                <Input
                  id="time"
                  type="time"
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                />
              </div>

              {/* Special Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Special Notes or Requests</Label>
                <Textarea
                  id="notes"
                  placeholder="Any special requests or preferences? (Optional)"
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  rows={4}
                />
              </div>

              {/* Contact Information Display */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Your Contact Information</h3>
                <p className="text-sm text-blue-800">
                  <strong>Name:</strong> {user?.name || "Not provided"}
                </p>
                <p className="text-sm text-blue-800">
                  <strong>Email:</strong> {user?.email || "Not provided"}
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={createAppointmentMutation.isPending}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 text-lg"
              >
                {createAppointmentMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Booking...
                  </>
                ) : (
                  "Complete Booking"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
