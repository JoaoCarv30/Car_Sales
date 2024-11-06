import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebaseConnection';

interface AuthProviderProps {
    children: ReactNode;
}

interface AuthContextData {
    signed: boolean;
    loadingAuth: boolean;
    handleInfoUser: ({ uid, name, email }: UserProps) => void;
    user: UserProps | null;
}

interface UserProps {
    uid: string;
    name: string | null;
    email: string | null;
}
export const AuthContext = createContext({} as AuthContextData);


export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<UserProps | null>(null);
    const [loadingAuth, setLoadingAuth] = useState(true);

    useEffect(() => {

        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                //tem usuário logado
                setUser(
                    {
                        uid: user.uid,
                        name: user.displayName,
                        email: user.email
                    }
                )
                setLoadingAuth(false);
            } else {
                //não tem usuário logado
                setUser(null);
                setLoadingAuth(false);
            }
        }
        )
        return () => {
            unsub();
        }

    }, []) 

    function handleInfoUser({ uid, name, email }: UserProps) {
setUser({ uid, name, email });
    }

    return (
        <AuthContext.Provider value={{
                signed: !!user,
                loadingAuth,
                handleInfoUser,
                user
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
