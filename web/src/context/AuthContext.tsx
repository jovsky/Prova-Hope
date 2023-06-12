import React, { createContext, useEffect, useState } from "react";
import { AuthContextInterface } from "../interfaces/interfaces";
// import useAuth from "./hooks/useAuth";
import { authenticate, registerUser } from "../api/APIService";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const AuthContext = createContext<AuthContextInterface>({
    user: null,
    sessionToken: null,
    isLogged: () => false,
    handleRegister: () => Promise.resolve({ success: false, message: "" }),
    handleLogin: () => Promise.resolve({ success: false, message: "" }),
    handleLogout: () => {},
});

function getUserFromToken(token: string) {
    const { email } = jwtDecode(token) as { email: string };
    return email ?? null;
}

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<string | null>(null);
    const [sessionToken, setToken] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const readValue = localStorage.getItem("token");
        const readToken = readValue === "undefined" ? null : readValue;
        if (readToken) {
            setToken(readToken);
            const email = getUserFromToken(readToken);
            setUser(email);
        }
    }, []);

    async function handleRegister(
        email: string,
        password: string
    ): Promise<{ success: boolean; message: string }> {
        const { message, success } = await registerUser(email, password);
        return { message, success };
    }

    async function handleLogin(
        email: string,
        password: string
    ): Promise<{ success: boolean; message: string }> {
        const { token, message, success } = await authenticate(email, password);

        if (!success || !token) {
            localStorage.removeItem("token");
            setUser(null);
            setToken(null);
            return { message, success };
        }

        localStorage.setItem("token", token);
        setUser(email);
        setToken(token);
        navigate("/dashboard");
        return { message, success };
    }

    function handleLogout() {
        setUser(null);
        localStorage.removeItem("token");
        navigate("/login");
    }

    function isLogged() {
        return !!user && !!sessionToken;
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                sessionToken,
                isLogged,
                handleRegister,
                handleLogin,
                handleLogout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
