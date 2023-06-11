import { useState, useEffect } from "react";
import { authenticate, registerUser } from "../../api/APIService";
// import jwt_decode from "jwt-decode";
// import jwt from "jsonwebtoken";
import history from "../../history";
import { AuthContextInterface } from "../../interfaces/interfaces";

function getUserFromToken(token: string) {
    // const decodedToken = jwt.decode(token);
    const decodedToken = { email: "123" };
    console.log(decodedToken);
    if (decodedToken && typeof decodedToken !== "string") {
        return decodedToken.email ?? null;
    }
    return null;
}

export default function useAuth(): AuthContextInterface {
    const [user, setUser] = useState<string | null>(null);
    const [sessionToken, setToken] = useState<string | null>(null);
    useEffect(() => {
        const readValue = localStorage.getItem("token");
        const readToken = readValue === "undefined" ? null : readValue;
        if (readToken) {
            setToken(readToken);
            const email = getUserFromToken(readToken);
            setUser(email);
            // api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
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
        // api.defaults.headers.Authorization = `Bearer ${token}`;
        setUser(email);
        setToken(token);
        history.push("/dashboard");
        return { message, success };
    }

    function handleLogout() {
        setUser(null);
        localStorage.removeItem("token");
        // api.defaults.headers.Authorization = undefined;
        history.push("/login");
    }

    function isLogged() {
        return !!user && !!sessionToken;
    }

    return {
        user,
        sessionToken,
        isLogged,
        handleRegister,
        handleLogin,
        handleLogout,
    };
}
