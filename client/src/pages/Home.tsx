import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { getLoginUrl } from "@/const";
import { Calendar, Users, Zap, Star, ArrowRight, MessageSquare, BarChart3, Settings, MapPin, Clock, Award } from "lucide-react";

export default function Home() {
  const { user, isAuthenticated, logout } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogout = async () => {
    await logout();
  };

  const features = [
    {
      icon: Calendar,
      title: "Easy Booking",
      description: "Schedule appointments in seconds with our intuitive booking system",
    },
    {
      icon: Users,
      title: "Client Management",
      description: "Manage all your clients and their appointment history in one place",
    },
    {
      icon: Star,
      title: "Ratings & Reviews",
      description: "Collect feedback and build trust with customer ratings",
    },
    {
      icon: MessageSquare,
      title: "AI Chatbot",
      description: "24/7 automated customer support with intelligent responses",
    },
    {
      icon: BarChart3,
      title: "Analytics",
      description: "Track revenue, appointments, and business performance",
    },
    {
      icon: Zap,
      title: "Notifications",
      description: "Automated reminders to reduce no-shows and cancellations",
    },
  ];

  const featuredBusinesses = [
    {
      id: 1,
      name: "Glow Beauty Salon",
      category: "Hair & Beauty",
      rating: 4.9,
      reviews: 234,
      location: "Downtown Belmopan",
      image: "🏢",
      services: ["Haircut", "Styling", "Coloring"],
      distance: "2.5 km",
    },
    {
      id: 2,
      name: "Zen Wellness Spa",
      category: "Spa & Wellness",
      rating: 4.8,
      reviews: 189,
      location: "Central District",
      image: "🧘",
      services: ["Massage", "Facial", "Aromatherapy"],
      distance: "1.8 km",
    },
    {
      id: 3,
      name: "Nails & Lashes Studio",
      category: "Nails & Beauty",
      rating: 4.7,
      reviews: 156,
      location: "Market Square",
      image: "💅",
      services: ["Manicure", "Pedicure", "Lash Extensions"],
      distance: "3.2 km",
    },
    {
      id: 4,
      name: "Elite Hair Lounge",
      category: "Hair Salon",
      rating: 4.9,
      reviews: 267,
      location: "North Avenue",
      image: "✂️",
      services: ["Haircut", "Perms", "Treatments"],
      distance: "2.1 km",
    },
  ];

  const navigationItems = [
    { label: "Book Appointment", path: "/booking", icon: Calendar, color: "bg-blue-100 text-blue-600" },
    { label: "My Dashboard", path: "/dashboard", icon: Users, color: "bg-purple-100 text-purple-600" },
    { label: "Services", path: "/services", icon: Star, color: "bg-yellow-100 text-yellow-600" },
    { label: "Chatbot", path: "/chatbot", icon: MessageSquare, color: "bg-green-100 text-green-600" },
    { label: "Owner Dashboard", path: "/owner/dashboard", icon: BarChart3, color: "bg-indigo-100 text-indigo-600" },
    { label: "Staff Schedule", path: "/owner/schedule", icon: Calendar, color: "bg-pink-100 text-pink-600" },
  ];

  // Client Dashboard Content
  if (isAuthenticated && user?.role === "user") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Navigation Bar */}
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">BZ Book It</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, {user?.name}!</span>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="text-red-600 hover:text-red-700"
              >
                Logout
              </Button>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Welcome Back, {user?.name}! 👋</h2>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Button
              onClick={() => setLocation("/booking")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-4 text-lg flex items-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Book New Appointment
            </Button>
            <Button
              onClick={() => setLocation("/dashboard")}
              variant="outline"
              className="px-6 py-4 text-lg"
            >
              <Users className="w-5 h-5 mr-2" />
              View My Appointments
            </Button>
            <Button
              onClick={() => setLocation("/services")}
              variant="outline"
              className="px-6 py-4 text-lg"
            >
              <Star className="w-5 h-5 mr-2" />
              Browse Services
            </Button>
          </div>

          {/* Featured Businesses for Clients */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Featured Businesses Near You</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredBusinesses.map((business) => (
                <Card key={business.id} className="hover:shadow-lg transition cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="text-4xl mb-3 text-center">{business.image}</div>
                    <h4 className="font-bold text-gray-900 mb-1">{business.name}</h4>
                    <p className="text-xs text-gray-600 mb-3">{business.category}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Award className="w-4 h-4 text-yellow-500" />
                        <span className="font-semibold">{business.rating}</span>
                        <span className="text-gray-600">({business.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {business.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        {business.distance} away
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-700 mb-2">Services:</p>
                      <div className="flex flex-wrap gap-1">
                        {business.services.map((service, idx) => (
                          <span key={idx} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Button
                      onClick={() => setLocation("/booking")}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      Book Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Owner Dashboard Content
  if (isAuthenticated && user?.role === "admin") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Navigation Bar */}
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">BZ Book It</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Business Owner: {user?.name}</span>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="text-red-600 hover:text-red-700"
              >
                Logout
              </Button>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Business Dashboard 📊</h2>

          {/* Owner Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Button
              onClick={() => setLocation("/owner/dashboard")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-4 text-lg"
            >
              <BarChart3 className="w-5 h-5 mr-2" />
              Analytics
            </Button>
            <Button
              onClick={() => setLocation("/owner/schedule")}
              variant="outline"
              className="px-6 py-4 text-lg"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Schedule
            </Button>
            <Button
              onClick={() => setLocation("/owner/services")}
              variant="outline"
              className="px-6 py-4 text-lg"
            >
              <Star className="w-5 h-5 mr-2" />
              Services
            </Button>
            <Button
              onClick={() => setLocation("/owner/reports/clients")}
              variant="outline"
              className="px-6 py-4 text-lg"
            >
              <Users className="w-5 h-5 mr-2" />
              Clients
            </Button>
          </div>

          {/* Owner Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-600 mb-1">Today's Appointments</p>
                <p className="text-3xl font-bold text-gray-900">8</p>
                <p className="text-sm text-green-600 mt-2">+2 from yesterday</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-600 mb-1">This Month Revenue</p>
                <p className="text-3xl font-bold text-gray-900">BZ$8,450</p>
                <p className="text-sm text-green-600 mt-2">+15% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-600 mb-1">Active Clients</p>
                <p className="text-3xl font-bold text-gray-900">156</p>
                <p className="text-sm text-green-600 mt-2">+12 new this week</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-600 mb-1">Avg. Rating</p>
                <p className="text-3xl font-bold text-gray-900">4.8</p>
                <p className="text-sm text-yellow-600 mt-2">Based on 89 reviews</p>
              </CardContent>
            </Card>
          </div>

          {/* Owner Reports */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <button
                  onClick={() => setLocation("/owner/reports/performance")}
                  className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition"
                >
                  <p className="font-semibold text-gray-900">Business Performance</p>
                  <p className="text-sm text-gray-600">Revenue, appointments, top services</p>
                </button>
                <button
                  onClick={() => setLocation("/owner/reports/chatbot")}
                  className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition"
                >
                  <p className="font-semibold text-gray-900">Chatbot Performance</p>
                  <p className="text-sm text-gray-600">AI response metrics and analytics</p>
                </button>
                <button
                  onClick={() => setLocation("/owner/notifications/log")}
                  className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition"
                >
                  <p className="font-semibold text-gray-900">Notification Log</p>
                  <p className="text-sm text-gray-600">View sent reminders and delivery status</p>
                </button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <button
                  onClick={() => setLocation("/owner/notifications/setup")}
                  className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition"
                >
                  <p className="font-semibold text-gray-900">Notification Settings</p>
                  <p className="text-sm text-gray-600">Configure reminders and alerts</p>
                </button>
                <button
                  onClick={() => setLocation("/owner/services")}
                  className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition"
                >
                  <p className="font-semibold text-gray-900">Manage Services</p>
                  <p className="text-sm text-gray-600">Add, edit, or remove services</p>
                </button>
                <button
                  onClick={() => setLocation("/owner/schedule")}
                  className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition"
                >
                  <p className="font-semibold text-gray-900">Staff Schedule</p>
                  <p className="text-sm text-gray-600">View and manage staff availability</p>
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Public Home Page (Not Logged In)
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">BZ Book It</h1>
          </div>

          <div className="flex items-center gap-4">
            <Button onClick={() => setLocation("/login")} className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Login
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Beauty & Wellness Booking Made Simple
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            BZ Book It is the all-in-one platform for beauty salons and wellness centers to manage appointments, clients, and grow their business.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              onClick={() => (window.location.href = getLoginUrl())}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-lg flex items-center gap-2"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              onClick={() => setLocation("/services")}
              variant="outline"
              className="px-8 py-6 text-lg"
            >
              Browse Services
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Businesses Section */}
      <section className="bg-white py-16 border-t border-gray-200 mb-12">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-gray-900 mb-4 text-center">Featured Businesses</h3>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Discover top-rated beauty and wellness businesses in your area
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBusinesses.map((business) => (
              <Card key={business.id} className="hover:shadow-lg transition cursor-pointer">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-3 text-center">{business.image}</div>
                  <h4 className="font-bold text-gray-900 mb-1">{business.name}</h4>
                  <p className="text-xs text-gray-600 mb-3">{business.category}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Award className="w-4 h-4 text-yellow-500" />
                      <span className="font-semibold">{business.rating}</span>
                      <span className="text-gray-600">({business.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {business.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      {business.distance} away
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Services:</p>
                    <div className="flex flex-wrap gap-1">
                      {business.services.map((service, idx) => (
                        <span key={idx} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button onClick={() => setLocation("/login")} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-gray-900 mb-4 text-center">Powerful Features</h3>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Everything you need to run a successful beauty and wellness business
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h3>
          <p className="text-lg mb-8 text-indigo-100">
            Join hundreds of beauty and wellness professionals using BZ Book It
          </p>
          <Button
            onClick={() => (window.location.href = getLoginUrl())}
            className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold"
          >
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-semibold mb-4">BZ Book It</h4>
              <p className="text-sm">The complete booking solution for beauty and wellness businesses.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">For Clients</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => setLocation("/services")} className="hover:text-white transition">Browse Services</button></li>
                <li><button onClick={() => setLocation("/booking")} className="hover:text-white transition">Book Appointment</button></li>
                <li><button onClick={() => setLocation("/chatbot")} className="hover:text-white transition">Ask Questions</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">For Owners</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => (window.location.href = getLoginUrl())} className="hover:text-white transition">Dashboard</button></li>
                <li><button onClick={() => (window.location.href = getLoginUrl())} className="hover:text-white transition">Manage Business</button></li>
                <li><button onClick={() => (window.location.href = getLoginUrl())} className="hover:text-white transition">Analytics</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2024 BZ Book It. All rights reserved. Powered by Manus.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
