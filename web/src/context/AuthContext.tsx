import React, { createContext, useEffect, useState } from "react";
import { AuthContextInterface, Session } from "../interfaces/interfaces";
import { authenticate, registerUser } from "../api/APIService";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const AuthContext = createContext<AuthContextInterface>({
    session: null,
    checkedStorage: false,
    handleRegister: () => Promise.resolve({ success: false, message: "" }),
    handleLogin: () => Promise.resolve({ success: false, message: "" }),
    handleLogout: () => {},
});

function getUserFromToken(token: string) {
    const { email } = jwtDecode(token) as { email: string };
    return email ?? null;
}

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<Session>(null);
    const [checkedStorage, setCheckedStorage] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const readValue = localStorage.getItem("token");
        const token = readValue === "undefined" ? null : readValue;
        if (token) {
            const email = getUserFromToken(token);
            setSession({ email, token });
        } else {
            setSession(null);
        }
        setCheckedStorage(true);
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
            setSession(null);
            return { message, success };
        }

        localStorage.setItem("token", token);
        setSession({ email, token });
        navigate("/dashboard");
        return { message, success };
    }

    function handleLogout() {
        setSession(null);
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <AuthContext.Provider
            value={{
                session,
                checkedStorage,
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
