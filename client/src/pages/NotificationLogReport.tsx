import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { Mail, MessageSquare, CheckCircle, AlertCircle, Download } from "lucide-react";

export default function NotificationLogReport() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  const notifications = [
    {
      id: 1,
      type: "email",
      recipient: "maria.garcia@email.com",
      subject: "Appointment Reminder - Hair Cut",
      sentAt: "2024-12-14 2:00 PM",
      status: "delivered",
      client: "Maria Garcia",
    },
    {
      id: 2,
      type: "sms",
      recipient: "+501 555-0123",
      subject: "Appointment Confirmation",
      sentAt: "2024-12-14 1:30 PM",
      status: "delivered",
      client: "Emily Chen",
    },
    {
      id: 3,
      type: "email",
      recipient: "jessica.lee@email.com",
      subject: "Feedback Request",
      sentAt: "2024-12-14 12:00 PM",
      status: "opened",
      client: "Jessica Lee",
    },
    {
      id: 4,
      type: "email",
      recipient: "david.smith@email.com",
      subject: "Cancellation Confirmation",
      sentAt: "2024-12-13 4:30 PM",
      status: "delivered",
      client: "David Smith",
    },
    {
      id: 5,
      type: "sms",
      recipient: "+501 555-0456",
      subject: "Appointment Reminder - Massage",
      sentAt: "2024-12-13 2:00 PM",
      status: "failed",
      client: "Lisa Wang",
    },
  ];

  const stats = [
    { label: "Total Sent", value: "248", color: "bg-blue-100 text-blue-600" },
    { label: "Delivered", value: "235", color: "bg-green-100 text-green-600" },
    { label: "Opened", value: "189", color: "bg-purple-100 text-purple-600" },
    { label: "Failed", value: "13", color: "bg-red-100 text-red-600" },
  ];

  const handleExport = () => {
    alert("Exporting notification log as CSV...");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Notification Log</h1>
            <p className="text-gray-600 mt-2">View all sent notifications and delivery status</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleExport}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export Report
            </Button>
            <Button
              onClick={() => setLocation("/owner/dashboard")}
              variant="outline"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notification Type
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600">
                  <option>All Types</option>
                  <option>Email</option>
                  <option>SMS</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600">
                  <option>All Status</option>
                  <option>Delivered</option>
                  <option>Opened</option>
                  <option>Failed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Table */}
        <Card>
          <CardHeader>
            <CardTitle>Notification History</CardTitle>
            <CardDescription>
              {notifications.length} notifications in the last 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Client</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Subject</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Recipient</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Sent At</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {notifications.map((notif) => (
                    <tr key={notif.id} className="border-b hover:bg-gray-50 transition">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {notif.type === "email" ? (
                            <Mail className="w-4 h-4 text-blue-600" />
                          ) : (
                            <MessageSquare className="w-4 h-4 text-green-600" />
                          )}
                          <span className="text-sm font-medium capitalize">
                            {notif.type}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">{notif.client}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{notif.subject}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{notif.recipient}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{notif.sentAt}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {notif.status === "delivered" && (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-sm font-medium text-green-600">
                                Delivered
                              </span>
                            </>
                          )}
                          {notif.status === "opened" && (
                            <>
                              <CheckCircle className="w-4 h-4 text-blue-600" />
                              <span className="text-sm font-medium text-blue-600">
                                Opened
                              </span>
                            </>
                          )}
                          {notif.status === "failed" && (
                            <>
                              <AlertCircle className="w-4 h-4 text-red-600" />
                              <span className="text-sm font-medium text-red-600">
                                Failed
                              </span>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
