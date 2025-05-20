// src/components/RequireRole.jsx
import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

export default function RequireRole({ children, allowedRoles }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/auth" replace />;
  }

  if (!allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}