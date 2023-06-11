import { useState, useEffect } from "react";
import { authenticate, registerUser } from "../../api/APIService";

import history from "../../history";
import { AuthContextInterface } from "../../interfaces/interfaces";

export default function useAuth(): AuthContextInterface {
    const [user, setUser] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            // api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            setUser("test_user");
        }
    }, []);

    async function handleRegister(
        email: string,
        password: string
    ): Promise<{ success: boolean; message: string }> {
        const { token, message, success } = await registerUser(email, password);

        if (!success) {
            localStorage.removeItem("token");
            setUser(null);
            return { message, success };
        }

        localStorage.setItem("token", JSON.stringify(token));
        // api.defaults.headers.Authorization = `Bearer ${token}`;
        setUser(email);
        history.push("/dashboard");
        return { message, success };
    }

    async function handleLogin(
        email: string,
        password: string
    ): Promise<{ success: boolean; message: string }> {
        const { token, message, success } = await authenticate(email, password);

        if (!success) {
            localStorage.removeItem("token");
            setUser(null);
            return { message, success };
        }

        localStorage.setItem("token", JSON.stringify(token));
        // api.defaults.headers.Authorization = `Bearer ${token}`;
        setUser(email);
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
        return !!user;
    }

    return { user, isLogged, handleRegister, handleLogin, handleLogout };
}
