import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { Users, Download, Search, Filter, Mail, Phone } from "lucide-react";

export default function ClientListReport() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const clients = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+501 555-0123",
      status: "active",
      joinDate: "2024-01-15",
      appointments: 12,
      totalSpent: "BZ$540",
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria.garcia@email.com",
      phone: "+501 555-0124",
      status: "active",
      joinDate: "2024-02-20",
      appointments: 8,
      totalSpent: "BZ$360",
    },
    {
      id: 3,
      name: "Emily Chen",
      email: "emily.chen@email.com",
      phone: "+501 555-0125",
      status: "active",
      joinDate: "2024-03-10",
      appointments: 15,
      totalSpent: "BZ$675",
    },
    {
      id: 4,
      name: "Jessica Lee",
      email: "jessica.lee@email.com",
      phone: "+501 555-0126",
      status: "inactive",
      joinDate: "2023-11-05",
      appointments: 5,
      totalSpent: "BZ$225",
    },
    {
      id: 5,
      name: "David Smith",
      email: "david.smith@email.com",
      phone: "+501 555-0127",
      status: "active",
      joinDate: "2024-04-01",
      appointments: 6,
      totalSpent: "BZ$450",
    },
    {
      id: 6,
      name: "Lisa Wang",
      email: "lisa.wang@email.com",
      phone: "+501 555-0128",
      status: "new",
      joinDate: "2024-12-01",
      appointments: 2,
      totalSpent: "BZ$150",
    },
  ];

  const stats = [
    { label: "Total Clients", value: "456", color: "bg-blue-100 text-blue-600" },
    { label: "Active Clients", value: "389", color: "bg-green-100 text-green-600" },
    { label: "New Clients", value: "34", color: "bg-purple-100 text-purple-600" },
    { label: "Inactive Clients", value: "33", color: "bg-gray-100 text-gray-600" },
  ];

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || client.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleExport = () => {
    alert("Exporting client list as CSV...");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Client List Report</h1>
            <p className="text-gray-600 mt-2">Manage and analyze your client database</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleExport}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export List
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

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                >
                  <option value="all">All Clients</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="new">New</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Client Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Clients
            </CardTitle>
            <CardDescription>
              {filteredClients.length} of {clients.length} clients
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Contact</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Join Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Appointments</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Total Spent</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-gray-500">
                        No clients found
                      </td>
                    </tr>
                  ) : (
                    filteredClients.map((client) => (
                      <tr key={client.id} className="border-b hover:bg-gray-50 transition">
                        <td className="py-3 px-4">
                          <p className="font-medium text-gray-900">{client.name}</p>
                        </td>
                        <td className="py-3 px-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Mail className="w-4 h-4" />
                              {client.email}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Phone className="w-4 h-4" />
                              {client.phone}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              client.status === "active"
                                ? "bg-green-100 text-green-800"
                                : client.status === "new"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {new Date(client.joinDate).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900 font-medium">
                          {client.appointments}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900 font-semibold">
                          {client.totalSpent}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
