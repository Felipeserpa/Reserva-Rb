// PrivateRoute.tsx
import React from "react";
import { Navigate, Route } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface PrivateRouteProps {
  path: string;
  element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ path, element }) => {
  const { signed, isAdmin } = useAuth();

  if (!signed || !isAdmin) {
    return <Navigate to="/login" />;
  }

  return <Route path={path} element={element} />;
};

export default PrivateRoute;
