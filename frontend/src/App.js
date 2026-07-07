import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import Landing from "@/pages/Landing";
import AuthCallback from "@/pages/AuthCallback";
import Dashboard from "@/pages/Dashboard";
import Baby from "@/pages/Baby";
import Career from "@/pages/Career";
import AICoach from "@/pages/AICoach";
import Stub from "@/pages/Stub";
import DashboardLayout from "@/components/DashboardLayout";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bloom-hero">
        <div className="w-14 h-14 rounded-full border-4 border-brand-secondary border-t-brand-primary animate-spin" />
      </div>
    );
  }
  if (!user) return <Navigate to="/" replace />;
  return children;
};

function AppRouter() {
  const location = useLocation();
  // Synchronous check — must run BEFORE anything else so we handle session_id before /auth/me
  if (location.hash?.includes("session_id=")) return <AuthCallback />;
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="baby" element={<Baby />} />
        <Route path="career" element={<Career />} />
        <Route path="coach" element={<AICoach />} />
        <Route path="finance" element={<Stub title="Family Finance" tagline="Expense tracking, budgets, and savings — coming soon." />} />
        <Route path="meals" element={<Stub title="Meal Planner" tagline="Healthy recipes, baby food and weekly plans — coming soon." />} />
        <Route path="health" element={<Stub title="Health" tagline="Sleep, water, mood and cycle tracking — coming soon." />} />
        <Route path="settings" element={<Stub title="Settings" tagline="Preferences, notifications and integrations — coming soon." />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRouter />
        <Toaster position="top-center" richColors />
      </BrowserRouter>
    </AuthProvider>
  );
}
