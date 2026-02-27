import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import LoginPage from "@/pages/LoginPage";
import StudentOverview from "@/pages/student/Overview";
import TopicMastery from "@/pages/student/TopicMastery";
import Sessions from "@/pages/student/Sessions";
import Recommendations from "@/pages/student/Recommendations";
import Reports from "@/pages/student/Reports";
import TeacherOverview from "@/pages/teacher/TeacherOverview";
import StudentAnalysis from "@/pages/teacher/StudentAnalysis";
import RiskAlerts from "@/pages/teacher/RiskAlerts";
import TeacherAnalytics from "@/pages/teacher/TeacherAnalytics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppRoutes() {
  const { role } = useAuth();

  if (!role) {
    return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  if (role === "student") {
    return (
      <Routes>
        <Route path="/dashboard" element={<StudentOverview />} />
        <Route path="/dashboard/topics" element={<TopicMastery />} />
        <Route path="/dashboard/sessions" element={<Sessions />} />
        <Route path="/dashboard/recommendations" element={<Recommendations />} />
        <Route path="/dashboard/reports" element={<Reports />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/teacher" element={<TeacherOverview />} />
      <Route path="/teacher/students" element={<StudentAnalysis />} />
      <Route path="/teacher/alerts" element={<RiskAlerts />} />
      <Route path="/teacher/analytics" element={<TeacherAnalytics />} />
      <Route path="/teacher/reports" element={<TeacherAnalytics />} />
      <Route path="*" element={<Navigate to="/teacher" replace />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
