import {
  ReactNode,
  createContext,
  useState,
  useEffect,
  SetStateAction,
  useContext,
} from "react";

import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/fireaseConection";

// Criar uma tipagem

// Define a interface para o usuário
interface User {
  uid: string;
  name: string | null;
  email: string | null;
  isAdmin?: boolean;
}

// Define a interface para o contexto de autenticação
interface AuthContextData {
  signed: boolean;
  loadingAuth: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: boolean;
}

// Crie o contexto de autenticação
export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

// Defina as propriedades do AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}
// Componente AuthProvider (onde definimos o valor do contexto)
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

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

  // Verifica se o usuário é um administrador com base no e-mail
  const isAdmin = user?.email === "admin@teste.com";

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      // Trate o erro conforme necessário (ex.: exiba uma mensagem de erro)
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ signed: !!user, loadingAuth, user, login, logout, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthProvider;
