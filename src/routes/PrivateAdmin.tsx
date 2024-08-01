import { ReactNode, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

interface PrivateProps {
  children: ReactNode;
}

export function PrivateAdmin({ children }: PrivateProps): any {
  const { signed, loadingAuth, isAdmin } = useContext(AuthContext);

  if (loadingAuth) {
    return <div>Carregando.....</div>;
  }
  if (!signed) {
    return <Navigate to="/AdminLogin" />;
  }

  if (!signed || !isAdmin) {
    console.log("Acesso negado:", { signed, isAdmin }); // Log para depuração
    return <Navigate to="/AdminLogin" state={{ from: "/admin" }} replace />;
    return children;
  }
}
