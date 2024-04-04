/* eslint-disable @typescript-eslint/no-unused-vars */

import { ReactNode, createContext , useState, useEffect } from "react";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../services/fireaseConection';


//Criar um tipagem,
interface AuthProviderProps {
    children: ReactNode;
}

interface AuthContextData {
    signed: boolean;
    loadingAuth: boolean;
    logout: () => Promise<void>
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

const logout = async () =>{
    try{
        await signOut(auth);
    }catch(error){
        console.error("Erro ao fazer logout:", error)
    }
};

    return (
        <AuthContext.Provider value={{ signed: !!user, loadingAuth }}>
            {children}
        </AuthContext.Provider>
    );
}