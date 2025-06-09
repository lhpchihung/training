import { createContext, ReactElement, useEffect, useState } from "react";

export enum UserRole {
    Admin = "admin",
    User = "user",
    Guest = "guest",
}

export interface User {
    name: string;
    email: string;
    role: UserRole;
}

const AuthenticatedContext = createContext<{
    user: User | null;
    loading: boolean;
    setUser: (user: User | null) => void;
}>({
    user: null,
    loading: true,
    setUser: () => { },
});

const getStoredUser = (): User | null => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
        try {
            return JSON.parse(storedUser);
        } catch (error) {
            sessionStorage.removeItem("user");
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

    return (
        <AuthenticatedContext.Provider value={{ user, loading, setUser }}>
            {children}
        </AuthenticatedContext.Provider>
    );
};

export { AuthenticatedProvider, AuthenticatedContext };