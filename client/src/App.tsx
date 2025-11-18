// App.tsx
import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import FloatingChatbot from "./components/FloatingChatbot";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "@/pages/Home";
import LoginPage from "@/pages/LoginPage";
import ServiceOfferedPage from "@/pages/ServiceOfferedPage";
import ClientBookingForm from "@/pages/ClientBookingForm";
import UserDashboard from "@/pages/UserDashboard";
import BookingConfirmation from "@/pages/BookingConfirmation";
import ModifyBookingForm from "@/pages/ModifyBookingForm";
import CustomerFeedbackForm from "@/pages/CustomerFeedbackForm";
import AIChatbotPage from "@/pages/AIChatbotPage";
import BusinessOwnerDashboard from "@/pages/BusinessOwnerDashboard";
import ServiceManagementForm from "@/pages/ServiceManagementForm";
import StaffScheduleViewer from "@/pages/StaffScheduleViewer";
import NotificationSetupForm from "@/pages/NotificationSetupForm";
import NotificationLogReport from "@/pages/NotificationLogReport";
import ServiceResponseReport from "@/pages/ServiceResponseReport";
import BusinessPerformanceDashboard from "@/pages/BusinessPerformanceDashboard";
import ClientListReport from "@/pages/ClientListReport";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import TestSupabase from "./TestSupabase"; // Supabase test component

// Router component
function AppRouter() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={LoginPage} />
      <Route path="/services" component={ServiceOfferedPage} />
      <Route path="/booking" component={ClientBookingForm} />
      <Route path="/dashboard" component={UserDashboard} />
      <Route path="/booking/confirmation/:id" component={BookingConfirmation} />
      <Route path="/booking/modify/:id" component={ModifyBookingForm} />
      <Route path="/feedback/:appointmentId" component={CustomerFeedbackForm} />
      <Route path="/chatbot" component={AIChatbotPage} />
      <Route path="/owner/dashboard" component={BusinessOwnerDashboard} />
      <Route path="/owner/services" component={ServiceManagementForm} />
      <Route path="/owner/schedule" component={StaffScheduleViewer} />
      <Route path="/owner/notifications/setup" component={NotificationSetupForm} />
      <Route path="/owner/notifications/log" component={NotificationLogReport} />
      <Route path="/owner/reports/chatbot" component={ServiceResponseReport} />
      <Route path="/owner/reports/performance" component={BusinessPerformanceDashboard} />
      <Route path="/owner/reports/clients" component={ClientListReport} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} /> {/* fallback */}
    </Switch>
  );
}

// Main App component
function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <AppRouter />
          <FloatingChatbot />

          {/* Supabase test component */}
          <TestSupabase />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
