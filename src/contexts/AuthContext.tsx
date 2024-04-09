/* eslint-disable @typescript-eslint/no-unused-vars */

import { ReactNode, createContext , useState, useEffect, SetStateAction } from "react";

import { onAuthStateChanged, } from "firebase/auth";
import { auth } from '../services/fireaseConection';


//Criar um tipagem,
interface AuthProviderProps {
    children: ReactNode;
}

interface AuthContextData {
    
    signed: boolean;
    loadingAuth: boolean;
    logout: () => void;
}

interface UserProps {
    uid: string;
    name: string | null;
    email: string | null;
}

export const AuthContext = createContext({} as AuthContextData);

// Renomeie a declaração da função para AuthProvider
export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps | null>(null);
    const [loadingAuth, setLoadingAuth] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    const login = (user: SetStateAction<null>) => {
      setCurrentUser(user);
    };
  
    const logout = () => {
      setCurrentUser(null);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    uid: user.uid,
                    name: user.displayName,
                    email: user.email,
                });
                setLoadingAuth(false);
            } else {
                setUser(null);
                setLoadingAuth(false);
            }
        });

        return () => unsubscribe();
    }, []);


    return (
        <AuthContext.Provider value={{ signed: !!user, loadingAuth,logout,login,currentUser}}>
            {children}
        </AuthContext.Provider>
    );
}