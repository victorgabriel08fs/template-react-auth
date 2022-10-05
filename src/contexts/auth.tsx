import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserInterface } from '../dtos/UserDTO';
import { api } from '../services/api';

interface AuthContextData {
    signed: boolean;
    user: UserInterface | null;
    Login({ email, password }: { email: string, password: string }): Promise<void>;
    Logout(): Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: { children: any }) => {
    const [user, setUser] = useState<UserInterface | null>(null);
    
    useEffect(() => {
        const storagedUser = localStorage.getItem('@App:user');
        const storagedToken = localStorage.getItem('@App:token');
    
        if (storagedToken && storagedUser) {
          setUser(JSON.parse(storagedUser));
          api.defaults.headers.common['Authorization'] = `Bearer ${storagedToken}`;
        }
      }, []);

    return (
        <AuthContext.Provider value={{ signed: Boolean(user), user, Login, Logout }}>
            {children}
        </AuthContext.Provider >
    );


    async function Login({ email, password }: { email: string, password: string }) {
        const response = await api.post('/auth/login', {
            email,
            password,
        });

        setUser(response.data.user);
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

        localStorage.setItem('@App:user', JSON.stringify(response.data.user));
        localStorage.setItem('@App:token', response.data.token);

        console.log(response);
    }

    async function Logout() {
        setUser(null);
        api.defaults.headers.common['Authorization'] = ``;
        localStorage.setItem('@App:user', "");
        localStorage.setItem('@App:token', "");
    }
};


export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}


export default AuthContext;