import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { Calendar, Clock, User, MapPin } from "lucide-react";

export default function StaffScheduleViewer() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  const staffMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      specialization: "Hair Styling",
      appointments: [
        { time: "9:00 AM", client: "Maria Garcia", service: "Hair Cut", duration: "60 min" },
        { time: "10:30 AM", client: "Emily Chen", service: "Color Treatment", duration: "120 min" },
        { time: "1:00 PM", client: "Jessica Lee", service: "Hair Cut", duration: "60 min" },
      ],
    },
    {
      id: 2,
      name: "Michael Brown",
      specialization: "Massage & Wellness",
      appointments: [
        { time: "10:00 AM", client: "David Smith", service: "Swedish Massage", duration: "90 min" },
        { time: "2:00 PM", client: "Lisa Wang", service: "Deep Tissue Massage", duration: "90 min" },
      ],
    },
    {
      id: 3,
      name: "Amanda Rodriguez",
      specialization: "Nails & Skincare",
      appointments: [
        { time: "9:30 AM", client: "Jennifer Brown", service: "Manicure", duration: "45 min" },
        { time: "11:00 AM", client: "Rachel Green", service: "Facial", duration: "75 min" },
        { time: "3:00 PM", client: "Sophie Turner", service: "Pedicure", duration: "60 min" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Staff Schedule</h1>
            <p className="text-gray-600 mt-2">View all staff appointments for today</p>
          </div>
          <Button
            onClick={() => setLocation("/owner/dashboard")}
            variant="outline"
          >
            Back to Dashboard
          </Button>
        </div>

        {/* Date Selector */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Calendar className="w-5 h-5 text-indigo-600" />
              <input
                type="date"
                defaultValue={new Date().toISOString().split("T")[0]}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </CardContent>
        </Card>

        {/* Staff Schedule Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {staffMembers.map((staff) => (
            <Card key={staff.id}>
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5 text-indigo-600" />
                      {staff.name}
                    </CardTitle>
                    <CardDescription>{staff.specialization}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {staff.appointments.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No appointments scheduled</p>
                ) : (
                  <div className="space-y-4">
                    {staff.appointments.map((apt, idx) => (
                      <div
                        key={idx}
                        className="border rounded-lg p-4 hover:bg-gray-50 transition"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-indigo-600" />
                            <span className="font-semibold text-gray-900">{apt.time}</span>
                          </div>
                          <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                            {apt.duration}
                          </span>
                        </div>
                        <p className="font-medium text-gray-900">{apt.service}</p>
                        <p className="text-sm text-gray-600">Client: {apt.client}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Staff Info */}
                <div className="mt-6 pt-4 border-t">
                  <p className="text-xs text-gray-500 mb-2">Total Hours:</p>
                  <p className="font-semibold text-gray-900">
                    {staff.appointments.reduce((sum, apt) => {
                      const hours = parseInt(apt.duration) / 60;
                      return sum + hours;
                    }, 0).toFixed(1)} hours
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Appointments</p>
                <p className="text-2xl font-bold text-gray-900">
                  {staffMembers.reduce((sum, staff) => sum + staff.appointments.length, 0)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Staff Members</p>
                <p className="text-2xl font-bold text-gray-900">{staffMembers.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Hours</p>
                <p className="text-2xl font-bold text-gray-900">
                  {staffMembers.reduce((sum, staff) => {
                    return sum + staff.appointments.reduce((staffSum, apt) => {
                      return staffSum + parseInt(apt.duration) / 60;
                    }, 0);
                  }, 0).toFixed(1)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
