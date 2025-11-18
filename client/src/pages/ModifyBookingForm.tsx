import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLocation, useRoute } from "wouter";
import { toast } from "sonner";
import { Loader2, AlertCircle } from "lucide-react";

export default function ModifyBookingForm() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/booking/:id/modify");
  const appointmentId = params?.id ? parseInt(params.id) : 0;

  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [cancellationReason, setCancellationReason] = useState("");
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const updateAppointmentMutation = trpc.appointments.update.useMutation({
    onSuccess: () => {
      toast.success("Appointment updated successfully!");
      setLocation("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update appointment");
    },
  });

  const cancelAppointmentMutation = trpc.appointments.cancel.useMutation({
    onSuccess: () => {
      toast.success("Appointment cancelled successfully");
      setLocation("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to cancel appointment");
    },
  });

  const handleModify = (e: React.FormEvent) => {
    e.preventDefault();

    if (!appointmentDate || !appointmentTime) {
      toast.error("Please select a new date and time");
      return;
    }

    const appointmentDateTime = new Date(`${appointmentDate}T${appointmentTime}`);

    updateAppointmentMutation.mutate({
      appointmentId,
      appointmentDate: appointmentDateTime,
      durationMinutes: 60,
    });
  };

  const handleCancel = () => {
    if (!cancellationReason.trim()) {
      toast.error("Please provide a cancellation reason");
      return;
    }

    cancelAppointmentMutation.mutate({
      appointmentId,
      cancellationReason,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Modify Appointment */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Reschedule Appointment</CardTitle>
              <CardDescription>
                Change your appointment date and time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleModify} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="date">New Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">New Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                  />
                </div>

                <div className="bg-blue-50 p-3 rounded-lg flex gap-3 text-sm text-blue-800">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p>Changes must be made at least 24 hours before your appointment.</p>
                </div>

                <Button
                  type="submit"
                  disabled={updateAppointmentMutation.isPending}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  {updateAppointmentMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Confirm New Date & Time"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Cancel Appointment */}
          <Card className="border-red-200">
            <CardHeader className="bg-red-50 border-b border-red-200">
              <CardTitle className="text-2xl text-red-900">Cancel Appointment</CardTitle>
              <CardDescription className="text-red-700">
                This action cannot be undone
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {!showCancelConfirm ? (
                <Button
                  onClick={() => setShowCancelConfirm(true)}
                  variant="destructive"
                  className="w-full"
                >
                  Request Cancellation
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <p className="text-sm text-red-900 font-semibold mb-2">
                      Are you sure you want to cancel?
                    </p>
                    <p className="text-sm text-red-800 mb-4">
                      Please note: Cancellations made within 24 hours of your appointment may incur a cancellation fee.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason">Reason for Cancellation</Label>
                    <Textarea
                      id="reason"
                      placeholder="Please tell us why you're cancelling..."
                      value={cancellationReason}
                      onChange={(e) => setCancellationReason(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => setShowCancelConfirm(false)}
                      variant="outline"
                      className="flex-1"
                    >
                      Keep Appointment
                    </Button>
                    <Button
                      onClick={handleCancel}
                      disabled={cancelAppointmentMutation.isPending}
                      variant="destructive"
                      className="flex-1"
                    >
                      {cancelAppointmentMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Cancelling...
                        </>
                      ) : (
                        "Confirm Cancellation"
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 text-center">
          <Button
            onClick={() => setLocation("/dashboard")}
            variant="ghost"
            className="text-indigo-600 hover:text-indigo-700"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
