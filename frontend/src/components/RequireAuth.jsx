// src/components/RequireAuth.jsx
import { useEffect, useState } from 'react';
import { useAuth } from "./AuthContext";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
  const { currentUser, loading, checkAuth } = useAuth();
  const location = useLocation();
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  useEffect(() => {
    if (!initialCheckDone) {
      checkAuth().finally(() => setInitialCheckDone(true));
    }
  }, [checkAuth, initialCheckDone]);

  if (loading || !initialCheckDone) {
    return <div className="flex justify-center items-center h-screen">Chargement...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
}