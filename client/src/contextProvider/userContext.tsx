import { createContext, useContext, useState, useEffect, type PropsWithChildren } from "react";
import type { IUserContext, JwtPayload, User } from "./icontext";
import { jwtDecode } from "jwt-decode";

const userContext = createContext<IUserContext | null>(null);

export function UserContextProvider({ children }: PropsWithChildren) {
    const [user, setUser] = useState<User | null>(() => {
        const saveUser = localStorage.getItem("user");
        return saveUser ? JSON.parse(saveUser) : null;
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            const decode: JwtPayload = jwtDecode(token)
            const currentTime = Date.now()
            if (decode.exp * 1000 < currentTime) {
                setUser(null);
                localStorage.removeItem("user");
                localStorage.removeItem("token");
            }
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        }
    }, [user]);

    return (
        <userContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </userContext.Provider>
    );
}
export default function useUserContext() {
    const ctx = useContext(userContext);
    if (!ctx) {
        throw new Error("useUserContext must be used by UserContextProvider");
    }
    return ctx;
}
