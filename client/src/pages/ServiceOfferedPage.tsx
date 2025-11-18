import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";

async function fetchServices() {
  const { data, error } = await supabase.from("services").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export default function ServiceOfferedPage() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  const { data: services, isLoading, isError, error } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
  });

  if (isLoading) {
    return <div className="min-h-screen bg-gray-50 p-4 text-center">Loading services...</div>;
  }

  if (isError) {
    return <div className="min-h-screen bg-gray-50 p-4 text-center text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services?.map((service) => (
            <Card key={service.id}>
              <CardHeader>
                <CardTitle>{service.name}</CardTitle>
                <CardDescription>{service.short_description || 'Professional beauty service'}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">{service.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-indigo-600">
                    BZ${service.price}
                  </span>
                  <Button
                    onClick={() => user ? setLocation("/booking") : setLocation("/login")}
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
