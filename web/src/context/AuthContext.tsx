import React, { createContext } from "react";
import { AuthContextInterface } from "../interfaces/interfaces";
import useAuth from "./hooks/useAuth";

const AuthContext = createContext<AuthContextInterface>({
    user: null,
    sessionToken: null,
    isLogged: () => false,
    handleRegister: () => Promise.resolve({ success: false, message: "" }),
    handleLogin: () => Promise.resolve({ success: false, message: "" }),
    handleLogout: () => {},
});

function AuthProvider({ children }: { children: React.ReactNode }) {
    return (
        <AuthContext.Provider value={useAuth()}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
