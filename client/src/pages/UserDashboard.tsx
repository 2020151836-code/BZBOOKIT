import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Calendar, Bell, LogOut } from "lucide-react";
import { useLocation } from "wouter";

export default function UserDashboard() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();

  const appointmentsQuery = trpc.appointments.getClientAppointments.useQuery();
  const notificationsQuery = trpc.notifications.getUserNotifications.useQuery();

  const handleLogout = async () => {
    await logout();
    setLocation("/");
  };

  if (appointmentsQuery.isLoading || notificationsQuery.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  const appointments = appointmentsQuery.data || [];
  const notifications = notificationsQuery.data || [];

  return (
    <div className="min-h-screen bg-gray-50 p-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Welcome, {user?.name}!</h1>
            <p className="text-gray-600 mt-2">Manage your appointments and notifications</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Upcoming Appointments
                </CardTitle>
                <CardDescription>
                  {appointments.length} appointment{appointments.length !== 1 ? "s" : ""}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {appointments.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">No upcoming appointments</p>
                    <Button
                      onClick={() => setLocation("/booking")}
                      className="bg-indigo-600 hover:bg-indigo-700"
                    >
                      Book Now
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {appointments.map((apt) => (
                      <div
                        key={apt.id}
                        className="border rounded-lg p-4 hover:bg-gray-50 transition"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">Appointment #{apt.confirmationNumber}</h3>
                            <p className="text-sm text-gray-600">
                              {new Date(apt.appointmentDate).toLocaleDateString()} at{" "}
                              {new Date(apt.appointmentDate).toLocaleTimeString()}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              Duration: {apt.durationMinutes} minutes
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              apt.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : apt.status === "cancelled"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                          </span>
                        </div>
                        {apt.specialNotes && (
                          <p className="text-sm text-gray-600 mt-2">Notes: {apt.specialNotes}</p>
                        )}
                        <div className="flex gap-2 mt-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setLocation(`/booking/${apt.id}/modify`)}
                          >
                            Modify
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => setLocation(`/booking/${apt.id}/modify`)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notifications
                </CardTitle>
                <CardDescription>
                  {notifications.filter((n) => !n.isRead).length} unread
                </CardDescription>
              </CardHeader>
              <CardContent>
                {notifications.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-4">
                    No notifications yet
                  </p>
                ) : (
                  <div className="space-y-3">
                    {notifications.slice(0, 5).map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-3 rounded-lg text-sm ${
                          notif.isRead
                            ? "bg-gray-100 text-gray-600"
                            : "bg-blue-100 text-blue-800 font-medium"
                        }`}
                      >
                        <p className="font-semibold">{notif.title}</p>
                        <p className="text-xs mt-1 opacity-75">
                          {new Date(notif.sentAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
