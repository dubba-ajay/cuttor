import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return null;
  if (!user) return <Navigate to="/" state={{ from: location }} replace />;
  return children;
}

export function RequireRole({ children, role }: { children: JSX.Element; role: "freelancer" | "owner" | "customer" }) {
  const { user, loading, role: current } = useAuth();
  const location = useLocation();
  if (loading) return null;
  if (!user) return <Navigate to="/" state={{ from: location }} replace />;
  if (current !== role) return <Navigate to="/" replace />;
  return children;
}
