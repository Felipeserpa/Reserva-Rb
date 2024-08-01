import {
  ReactNode,
  createContext,
  useState,
  useEffect,
  SetStateAction,
} from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/fireaseConection";

// Criar uma tipagem
interface AuthContextData {
  signed: boolean;
  loadingAuth: boolean;
  logout: () => void;
  isAdmin?: boolean;
}

interface User {
  uid: string;
  name: string | null;
  email: string | null;
}

export const AuthContext = createContext({} as AuthContextData);

// Renomeie a declaração da função para AuthProvider
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const logout = () => {
    // Implementar lógica de logout (ex: auth.signOut())
    setUser(null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
        });
      } else {
        setUser(null);
      }
      setLoadingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  console.log("Estado de Autenticação:", user); // Log para depuração

  return (
    <AuthContext.Provider value={{ signed: !!user, loadingAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
