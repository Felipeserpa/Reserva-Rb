// PrivateRoute.tsx
import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../services/fireaseConection";

interface PrivateProps {
  children: ReactNode;
}

export function PrivateDashboard({ children }: PrivateProps): ReactNode {
  const { signed, loadingAuth } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    if (signed) {
      auth.currentUser
        ?.getIdTokenResult()
        .then((idTokenResult) => {
          setIsAdmin(!!idTokenResult.claims.isAdmin);
        })
        .catch((error) => {
          console.error("Erro ao obter token:", error);
          setIsAdmin(false);
        });
    }
  }, [signed]);

  if (loadingAuth || isAdmin === null) {
    return <div>Loading...</div>;
  }

  if (!signed || !isAdmin) {
    return <Navigate to="/adminlogin" />;
  }

  return children;
}
