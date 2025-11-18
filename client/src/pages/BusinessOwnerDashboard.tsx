import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { BarChart, Users, Calendar, DollarSign, TrendingUp, Settings } from "lucide-react";

export default function BusinessOwnerDashboard() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = async () => {
    await logout();
    setLocation("/");
  };

  const stats = [
    {
      label: "Total Appointments",
      value: "248",
      change: "+12%",
      icon: Calendar,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Active Clients",
      value: "156",
      change: "+8%",
      icon: Users,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Monthly Revenue",
      value: "BZ$12,450",
      change: "+15%",
      icon: DollarSign,
      color: "bg-purple-100 text-purple-600",
    },
    {
      label: "Avg. Rating",
      value: "4.8/5",
      change: "+0.2",
      icon: TrendingUp,
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  const recentAppointments = [
    { id: 1, client: "Sarah Johnson", service: "Hair Cut", time: "2:00 PM", status: "Completed" },
    { id: 2, client: "Maria Garcia", service: "Manicure", time: "3:30 PM", status: "Confirmed" },
    { id: 3, client: "Emily Chen", service: "Facial", time: "4:00 PM", status: "Pending" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Business Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back, {user?.name}!</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => setLocation("/owner/services")}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Manage Services
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-red-600 hover:text-red-700"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-green-600 mt-2">{stat.change} from last month</p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Appointments */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Appointments</CardTitle>
                <CardDescription>Latest bookings from your clients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAppointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition"
                    >
                      <div>
                        <p className="font-semibold text-gray-900">{apt.client}</p>
                        <p className="text-sm text-gray-600">{apt.service} at {apt.time}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          apt.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : apt.status === "Confirmed"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {apt.status}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={() => setLocation("/owner/schedule")}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  View Schedule
                </Button>
                <Button
                  onClick={() => setLocation("/owner/reports/performance")}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <BarChart className="w-4 h-4 mr-2" />
                  Performance Report
                </Button>
                <Button
                  onClick={() => setLocation("/owner/reports/clients")}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Client List
                </Button>
                <Button
                  onClick={() => setLocation("/owner/notifications/setup")}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Notification Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
