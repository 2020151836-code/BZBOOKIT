import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, Send, MessageCircle, X } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

export default function AIChatbotPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: "Hello! I'm the BZ Book It assistant. How can I help you today? You can ask me about booking appointments, services, pricing, or anything else!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) {
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const botResponses: { [key: string]: string } = {
        "book": "I can help you book an appointment! You can visit our booking page to schedule a service. What type of service are you interested in?",
        "price": "Our services range from BZ$30 for manicures to BZ$75 for massages. Would you like to know more about a specific service?",
        "hours": "We're open Monday to Saturday, 9 AM to 6 PM. Sunday appointments are available by request.",
        "cancel": "You can cancel or reschedule your appointment from your dashboard. Cancellations must be made 24 hours in advance.",
        "staff": "We have experienced professionals ready to serve you. You can view staff profiles when booking your appointment.",
        "payment": "We accept cash, credit cards, and digital payments. Payment is due at the time of service.",
      };

      let response = "I'm not sure about that. Could you provide more details? You can ask me about booking, pricing, hours, cancellations, staff, or payment methods.";

      for (const [key, value] of Object.entries(botResponses)) {
        if (input.toLowerCase().includes(key)) {
          response = value;
          break;
        }
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 500);
  };

  const clearChat = () => {
    setMessages([
      {
        id: "1",
        type: "bot",
        content: "Hello! I'm the BZ Book It assistant. How can I help you today?",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 py-12">
      <div className="max-w-2xl mx-auto">
        <Card className="h-screen max-h-[600px] flex flex-col">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-6 h-6" />
                <div>
                  <CardTitle className="text-white">BZ Book It Assistant</CardTitle>
                  <CardDescription className="text-indigo-100">
                    Available 24/7 to help you
                  </CardDescription>
                </div>
              </div>
              <Button
                onClick={clearChat}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    message.type === "user"
                      ? "bg-indigo-600 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-900 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.type === "user"
                        ? "text-indigo-200"
                        : "text-gray-600"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-900 px-4 py-3 rounded-lg rounded-bl-none">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </CardContent>

          <div className="border-t p-4">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Try asking about booking, pricing, hours, or cancellations
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
