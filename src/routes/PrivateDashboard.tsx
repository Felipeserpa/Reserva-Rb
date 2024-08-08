// PrivateRoute.tsx
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface PrivateProps {
  children: ReactNode;
}

export function PrivateDashboard({ children }: PrivateProps): ReactNode {
  const { signed, loadingAuth, isAdmin } = useAuth();

  if (loadingAuth) {
    return <div>Loading...</div>;
  }

  if (!signed || !isAdmin) {
    return <Navigate to="/adminlogin" />;
  }

  return children;
}
