import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { Bell, Clock, Mail, MessageSquare, Save } from "lucide-react";

export default function NotificationSetupForm() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  const [settings, setSettings] = useState({
    appointmentReminder: true,
    reminderTime: "24",
    reminderMethod: "email",
    cancellationNotification: true,
    feedbackRequest: true,
    promotionalEmails: false,
    smsNotifications: false,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleChange = (key: keyof typeof settings, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    toast.success("Notification settings saved successfully!");
  };

  const NotificationOption = ({ icon: Icon, title, description, settingKey, type = "toggle" }: { icon: any; title: string; description: string; settingKey: keyof typeof settings; type?: string }) => (
    <div className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition">
      <div className="p-3 bg-indigo-100 rounded-lg flex-shrink-0">
        <Icon className="w-5 h-5 text-indigo-600" />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
      {type === "toggle" && (
        <button
          onClick={() => handleToggle(settingKey)}
          className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors flex-shrink-0 ${
            settings[settingKey as keyof typeof settings]
              ? "bg-indigo-600"
              : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
              settings[settingKey as keyof typeof settings]
                ? "translate-x-7"
                : "translate-x-1"
            }`}
          />
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Notification Settings</h1>
            <p className="text-gray-600 mt-2">Manage how and when you receive notifications</p>
          </div>
          <Button
            onClick={() => setLocation("/owner/dashboard")}
            variant="outline"
          >
            Back to Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Appointment Reminders */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Appointment Reminders
                </CardTitle>
                <CardDescription>
                  Get notified before upcoming appointments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <NotificationOption
                  icon={Clock}
                  title="Enable Appointment Reminders"
                  description="Receive notifications before client appointments"
                  settingKey="appointmentReminder"
                  type="toggle"
                />

                {settings.appointmentReminder && (
                  <>
                    <div className="space-y-2 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <Label htmlFor="reminderTime">Reminder Time Before Appointment</Label>
                      <select
                        id="reminderTime"
                        value={settings.reminderTime}
                        onChange={(e) => handleChange("reminderTime", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      >
                        <option value="15">15 minutes before</option>
                        <option value="30">30 minutes before</option>
                        <option value="60">1 hour before</option>
                        <option value="120">2 hours before</option>
                        <option value="1440">1 day before</option>
                        <option value="2880">2 days before</option>
                      </select>
                    </div>

                    <div className="space-y-2 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <Label htmlFor="reminderMethod">Notification Method</Label>
                      <select
                        id="reminderMethod"
                        value={settings.reminderMethod}
                        onChange={(e) => handleChange("reminderMethod", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      >
                        <option value="email">Email</option>
                        <option value="sms">SMS</option>
                        <option value="both">Both Email & SMS</option>
                      </select>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Other Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Other Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <NotificationOption
                  icon={MessageSquare}
                  title="Cancellation Alerts"
                  description="Get notified when clients cancel appointments"
                  settingKey="cancellationNotification"
                  type="toggle"
                />

                <NotificationOption
                  icon={Mail}
                  title="Feedback Requests"
                  description="Send feedback requests after appointments"
                  settingKey="feedbackRequest"
                  type="toggle"
                />

                <NotificationOption
                  icon={Bell}
                  title="Promotional Emails"
                  description="Receive special offers and promotions"
                  settingKey="promotionalEmails"
                  type="toggle"
                />

                <NotificationOption
                  icon={MessageSquare}
                  title="SMS Notifications"
                  description="Receive text message notifications"
                  settingKey="smsNotifications"
                  type="toggle"
                />
              </CardContent>
            </Card>
          </div>

          {/* Summary Card */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Settings Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Appointment Reminders</p>
                  <p className="font-semibold text-gray-900">
                    {settings.appointmentReminder ? "Enabled" : "Disabled"}
                  </p>
                  {settings.appointmentReminder && (
                    <p className="text-xs text-gray-600 mt-1">
                      {settings.reminderTime} minutes before via {settings.reminderMethod}
                    </p>
                  )}
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600 mb-2">Active Notifications</p>
                  <div className="space-y-1 text-sm">
                    {settings.appointmentReminder && (
                      <p className="text-gray-700">✓ Appointment reminders</p>
                    )}
                    {settings.cancellationNotification && (
                      <p className="text-gray-700">✓ Cancellation alerts</p>
                    )}
                    {settings.feedbackRequest && (
                      <p className="text-gray-700">✓ Feedback requests</p>
                    )}
                    {settings.promotionalEmails && (
                      <p className="text-gray-700">✓ Promotional emails</p>
                    )}
                    {settings.smsNotifications && (
                      <p className="text-gray-700">✓ SMS notifications</p>
                    )}
                  </div>
                </div>

                <Button
                  onClick={handleSave}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white mt-4 flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
