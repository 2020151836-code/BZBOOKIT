import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { TrendingUp, Users, DollarSign, Calendar, Award, BarChart3 } from "lucide-react";

export default function BusinessPerformanceDashboard() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  const performanceMetrics = [
    {
      label: "Total Revenue",
      value: "BZ$48,250",
      change: "+22%",
      icon: DollarSign,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Total Appointments",
      value: "892",
      change: "+18%",
      icon: Calendar,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Active Clients",
      value: "456",
      change: "+12%",
      icon: Users,
      color: "bg-purple-100 text-purple-600",
    },
    {
      label: "Avg. Rating",
      value: "4.7/5",
      change: "+0.2",
      icon: Award,
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  const topServices = [
    { name: "Hair Cut & Styling", revenue: "BZ$12,450", appointments: 245, rating: 4.8 },
    { name: "Massage", revenue: "BZ$10,200", appointments: 156, rating: 4.9 },
    { name: "Facial Treatment", revenue: "BZ$8,900", appointments: 134, rating: 4.6 },
    { name: "Manicure", revenue: "BZ$7,650", appointments: 289, rating: 4.5 },
    { name: "Pedicure", revenue: "BZ$5,400", appointments: 178, rating: 4.7 },
  ];

  const monthlyRevenue = [
    { month: "Aug", revenue: 35000 },
    { month: "Sep", revenue: 38500 },
    { month: "Oct", revenue: 42000 },
    { month: "Nov", revenue: 45800 },
    { month: "Dec", revenue: 48250 },
  ];

  const clientSegmentation = [
    { segment: "New Clients", count: 89, percentage: 19 },
    { segment: "Regular Clients", count: 234, percentage: 51 },
    { segment: "VIP Clients", count: 45, percentage: 10 },
    { segment: "Inactive Clients", count: 88, percentage: 20 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Business Performance</h1>
            <p className="text-gray-600 mt-2">Comprehensive analytics and business metrics</p>
          </div>
          <Button
            onClick={() => setLocation("/owner/dashboard")}
            variant="outline"
          >
            Back to Dashboard
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {performanceMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                      <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                      <p className="text-sm text-green-600 mt-2">{metric.change} from last month</p>
                    </div>
                    <div className={`p-3 rounded-lg ${metric.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Revenue Trend */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Revenue Trend
              </CardTitle>
              <CardDescription>Last 5 months performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyRevenue.map((item, index) => {
                  const maxRevenue = Math.max(...monthlyRevenue.map(m => m.revenue));
                  const percentage = (item.revenue / maxRevenue) * 100;
                  return (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-gray-900">{item.month}</span>
                        <span className="text-gray-600">BZ${item.revenue.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Client Segmentation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Client Segmentation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clientSegmentation.map((segment, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{segment.segment}</span>
                      <span className="text-sm text-gray-600">{segment.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          index === 0
                            ? "bg-blue-600"
                            : index === 1
                            ? "bg-green-600"
                            : index === 2
                            ? "bg-purple-600"
                            : "bg-gray-400"
                        }`}
                        style={{ width: `${segment.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{segment.count} clients</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Services */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Top Performing Services
            </CardTitle>
            <CardDescription>Services ranked by revenue and customer satisfaction</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Service</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Revenue</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Appointments</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {topServices.map((service, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50 transition">
                      <td className="py-3 px-4">
                        <p className="font-medium text-gray-900">{service.name}</p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-gray-700 font-semibold">{service.revenue}</p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-gray-600">{service.appointments}</p>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-400">★</span>
                          <span className="font-medium text-gray-900">{service.rating}</span>
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
