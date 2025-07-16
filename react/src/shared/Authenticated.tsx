import { createContext, ReactElement, useEffect, useState } from 'react';

export enum UserRole {
    Admin = 'admin',
    User = 'user',
    Guest = 'guest'
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}

const AuthenticatedContext = createContext<{
    user: User | null;
    loading: boolean;
    setUser: (user: User | null) => void;
    setUserWithRemember: (user: User | null, remember: boolean) => void;
}>({
    user: null,
    loading: true,
    setUser: () => {},
    setUserWithRemember: () => {}
});

const getStoredUser = (): User | null => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
        try {
            return JSON.parse(storedUser);
        } catch (error) {
            sessionStorage.removeItem('user');
        }
    }
    return null;
};

const AuthenticatedProvider = ({ children }: { children: ReactElement }) => {
    const [user, setUser] = useState<User | null>(() => getStoredUser());
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    const setUserWithRemember = (user: User | null, remember: boolean) => {
        setUser(user);
        if (user) {
            sessionStorage.setItem('user', JSON.stringify(user));
            if (remember) {
                localStorage.setItem('email', user.email);
            } else {
                localStorage.removeItem('email');
            }
        } else {
            sessionStorage.removeItem('user');
            localStorage.removeItem('email');
        }
    };

    return (
        <AuthenticatedContext.Provider
            value={{
                user,
                loading,
                setUser,
                setUserWithRemember
            }}
        >
            {children}
        </AuthenticatedContext.Provider>
    );
};

export { AuthenticatedProvider, AuthenticatedContext };
