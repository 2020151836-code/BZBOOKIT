import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { TrendingUp, MessageSquare, Clock, Zap, Download } from "lucide-react";

export default function ServiceResponseReport() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  const chatbotStats = [
    {
      label: "Total Conversations",
      value: "1,245",
      change: "+18%",
      icon: MessageSquare,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Avg. Response Time",
      value: "0.8s",
      change: "-0.2s",
      icon: Clock,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "User Satisfaction",
      value: "4.6/5",
      change: "+0.3",
      icon: TrendingUp,
      color: "bg-purple-100 text-purple-600",
    },
    {
      label: "Resolution Rate",
      value: "87%",
      change: "+5%",
      icon: Zap,
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  const topQuestions = [
    { question: "How do I book an appointment?", count: 342, resolved: 98 },
    { question: "What are your hours?", count: 287, resolved: 100 },
    { question: "Can I cancel my appointment?", count: 156, resolved: 95 },
    { question: "What payment methods do you accept?", count: 134, resolved: 100 },
    { question: "Do you offer discounts?", count: 98, resolved: 92 },
  ];

  const conversationSamples = [
    {
      id: 1,
      user: "Sarah Johnson",
      query: "How much does a manicure cost?",
      response: "Our manicure service costs BZ$30 and takes about 45 minutes.",
      rating: 5,
    },
    {
      id: 2,
      user: "Maria Garcia",
      query: "Can I reschedule my appointment?",
      response: "Yes, you can reschedule through your dashboard. Changes must be made 24 hours before your appointment.",
      rating: 5,
    },
    {
      id: 3,
      user: "Emily Chen",
      query: "Do you have same-day appointments?",
      response: "Same-day appointments depend on availability. I recommend checking our booking page or calling us directly.",
      rating: 4,
    },
  ];

  const handleExport = () => {
    alert("Exporting chatbot report as PDF...");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">AI Chatbot Performance</h1>
            <p className="text-gray-600 mt-2">Monitor chatbot responses and customer interactions</p>
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

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {chatbotStats.map((stat, index) => {
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Questions */}
          <Card>
            <CardHeader>
              <CardTitle>Top Customer Questions</CardTitle>
              <CardDescription>Most frequently asked questions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topQuestions.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-3 border rounded-lg hover:bg-gray-50 transition">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{item.question}</p>
                      <div className="flex gap-4 mt-2 text-xs text-gray-600">
                        <span>Asked: {item.count} times</span>
                        <span className="text-green-600">Resolved: {item.resolved}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Conversation Quality */}
          <Card>
            <CardHeader>
              <CardTitle>Conversation Quality</CardTitle>
              <CardDescription>Sample conversations and ratings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conversationSamples.map((conv) => (
                  <div key={conv.id} className="p-3 border rounded-lg hover:bg-gray-50 transition">
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-medium text-gray-900 text-sm">{conv.user}</p>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-lg ${
                              i < conv.rating ? "text-yellow-400" : "text-gray-300"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">Q: {conv.query}</p>
                    <p className="text-xs text-gray-700 bg-blue-50 p-2 rounded">
                      A: {conv.response}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Trends */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Chatbot performance over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-900 font-semibold mb-2">Accuracy Rate</p>
                <p className="text-3xl font-bold text-blue-600">92%</p>
                <p className="text-xs text-blue-800 mt-2">Correct responses out of total</p>
              </div>

              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                <p className="text-sm text-green-900 font-semibold mb-2">User Engagement</p>
                <p className="text-3xl font-bold text-green-600">78%</p>
                <p className="text-xs text-green-800 mt-2">Follow-up interactions</p>
              </div>

              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                <p className="text-sm text-purple-900 font-semibold mb-2">Booking Conversions</p>
                <p className="text-3xl font-bold text-purple-600">34%</p>
                <p className="text-xs text-purple-800 mt-2">Conversations leading to bookings</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
