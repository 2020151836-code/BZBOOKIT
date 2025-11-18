import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { Plus, Loader2, Edit2, Trash2 } from "lucide-react";

export default function ServiceManagementForm() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [showForm, setShowForm] = useState(false);
  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const createServiceMutation = trpc.services.create.useMutation({
    onSuccess: () => {
      toast.success("Service created successfully!");
      setServiceName("");
      setDescription("");
      setDuration("");
      setPrice("");
      setCategory("");
      setShowForm(false);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create service");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!serviceName || !duration || !price) {
      toast.error("Please fill in all required fields");
      return;
    }

    createServiceMutation.mutate({
      businessId: 1,
      name: serviceName,
      description: description || undefined,
      durationMinutes: parseInt(duration),
      price: parseFloat(price),
      category: category || undefined,
    });
  };

  const services = [
    { id: 1, name: "Hair Cut & Styling", duration: 60, price: 45, category: "Hair" },
    { id: 2, name: "Manicure", duration: 45, price: 30, category: "Nails" },
    { id: 3, name: "Pedicure", duration: 60, price: 35, category: "Nails" },
    { id: 4, name: "Facial Treatment", duration: 75, price: 60, category: "Skincare" },
    { id: 5, name: "Massage", duration: 90, price: 75, category: "Wellness" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Service Management</h1>
            <p className="text-gray-600 mt-2">Manage your beauty services and pricing</p>
          </div>
          <Button
            onClick={() => setLocation("/owner/dashboard")}
            variant="outline"
          >
            Back to Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add Service Form */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add New Service
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!showForm ? (
                <Button
                  onClick={() => setShowForm(true)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                >
                  Create Service
                </Button>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Service Name *</Label>
                    <Input
                      id="name"
                      value={serviceName}
                      onChange={(e) => setServiceName(e.target.value)}
                      placeholder="e.g., Hair Cut"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="e.g., Hair, Nails"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (minutes) *</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="60"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Price (BZ$) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="45.00"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="desc">Description</Label>
                    <Textarea
                      id="desc"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Service details..."
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      disabled={createServiceMutation.isPending}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                    >
                      {createServiceMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        "Create"
                      )}
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setShowForm(false)}
                      variant="outline"
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Services List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Current Services</CardTitle>
                <CardDescription>
                  {services.length} service{services.length !== 1 ? "s" : ""} available
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{service.name}</h3>
                        <div className="flex gap-4 mt-2 text-sm text-gray-600">
                          <span>Duration: {service.duration} min</span>
                          <span>Price: BZ${service.price}</span>
                          <span className="text-indigo-600 font-medium">{service.category}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
