import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import history from "../history";

const Login = () => {
    //@ts-ignore
    window.tologin = () => {
        history.push("/login");
    };
    //@ts-ignore
    window.todash = () => {
        history.push("/dashboard");
    };
    const { handleLogin, handleRegister } = useContext(AuthContext);

    const [email, setEmail] = useState("joao@gmail");
    const [password, setPassword] = useState("senha123");
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [loading, setLoading] = useState(false);

    function onSubmit(type: "register" | "login") {
        setErrorMsg("");
        setLoading(true);

        const request = () =>
            type === "register"
                ? handleRegister(email, password)
                : handleLogin(email, password);

        request().then(({ message }) => {
            if (message) {
                setErrorMsg(message);
                setLoading(false);
            }
        });
    }

    return (
        <div>
            <h2>Login</h2>
            <form>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <p>status: {loading ? "Aguardando..." : errorMsg}</p>
                </div>
                <button type="button" onClick={() => onSubmit("login")}>
                    Login
                </button>
                <button type="button" onClick={() => onSubmit("register")}>
                    Registrar
                </button>
            </form>
        </div>
    );
};

export default Login;
