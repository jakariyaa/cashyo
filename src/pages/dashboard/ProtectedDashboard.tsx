import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import AgentDashboard from "./AgentDashboard";
import UserDashboard from "./UserDashboard";

export default function ProtectedDashboard() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  switch (user?.role) {
    case "user":
      return <UserDashboard />;
    case "agent":
      return <AgentDashboard />;
    case "admin":
      return <AdminDashboard />;
    default:
      return <Navigate to="/login" replace />;
  }
}
