import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLocation, useRoute } from "wouter";
import { toast } from "sonner";
import { Star, Loader2, Heart } from "lucide-react";

export default function CustomerFeedbackForm() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/feedback/:appointmentId");
  const appointmentId = params?.appointmentId ? parseInt(params.appointmentId) : 0;

  const [rating, setRating] = useState(0);
  const [serviceQuality, setServiceQuality] = useState(0);
  const [punctuality, setPunctuality] = useState(0);
  const [cleanliness, setCleanliness] = useState(0);
  const [comments, setComments] = useState("");

  const createFeedbackMutation = trpc.feedback.create.useMutation({
    onSuccess: () => {
      toast.success("Thank you for your feedback!");
      setLocation("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to submit feedback");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please provide an overall rating");
      return;
    }

    createFeedbackMutation.mutate({
      appointmentId,
      businessId: 1,
      rating,
      serviceQuality: serviceQuality || undefined,
      punctuality: punctuality || undefined,
      cleanliness: cleanliness || undefined,
      comments: comments || undefined,
    });
  };

  const StarRating = ({ value, onChange, label }: any) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-base font-semibold">{label}</Label>
        {value > 0 && (
          <span className="text-sm font-medium text-indigo-600">
            {value}/5
          </span>
        )}
      </div>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onChange(star)}
            className="focus:outline-none transition transform hover:scale-110"
            type="button"
          >
            <Star
              className={`w-8 h-8 transition-all ${
                star <= value
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300 hover:text-yellow-200"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Heart className="w-12 h-12 text-pink-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900">Share Your Experience</h1>
          <p className="text-gray-600 mt-2">Help us improve by rating your appointment</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Appointment Feedback</CardTitle>
            <CardDescription>
              Your feedback helps us provide better service
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              <StarRating
                value={rating}
                onChange={setRating}
                label="Overall Experience *"
              />

              <div className="border-t pt-8">
                <h3 className="text-lg font-semibold mb-6 text-gray-900">
                  Rate Specific Aspects (Optional)
                </h3>

                <div className="space-y-8">
                  <StarRating
                    value={serviceQuality}
                    onChange={setServiceQuality}
                    label="Service Quality"
                  />

                  <StarRating
                    value={punctuality}
                    onChange={setPunctuality}
                    label="Punctuality"
                  />

                  <StarRating
                    value={cleanliness}
                    onChange={setCleanliness}
                    label="Cleanliness & Hygiene"
                  />
                </div>
              </div>

              <div className="border-t pt-8">
                <div className="space-y-2">
                  <Label htmlFor="comments" className="text-base font-semibold">
                    Additional Comments
                  </Label>
                  <p className="text-sm text-gray-600 mb-3">
                    Tell us more about your experience (optional)
                  </p>
                  <Textarea
                    id="comments"
                    placeholder="What did you like most? Any suggestions for improvement?"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    rows={5}
                    className="resize-none"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={createFeedbackMutation.isPending}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 text-lg"
              >
                {createFeedbackMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Feedback"
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                Your feedback is valuable and helps us serve you better
              </p>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Button
            onClick={() => setLocation("/dashboard")}
            variant="ghost"
            className="text-indigo-600 hover:text-indigo-700"
          >
            Skip for Now
          </Button>
        </div>
      </div>
    </div>
  );
}
