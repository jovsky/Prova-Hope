import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Logo from "../components/Logo";
import { useEffect } from "react";

function validateEmailFormat(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function validatePasswordFormat(password: string) {
    const lengthRegex = /.{5,}/;
    const numberRegex = /\d/;
    const uppercaseRegex = /[A-Z]/;

    const hasMinimumLength = lengthRegex.test(password);
    const hasNumber = numberRegex.test(password);
    const hasUppercase = uppercaseRegex.test(password);

    return hasMinimumLength && hasNumber && hasUppercase;
}

const Login = () => {
    const { handleLogin, handleRegister } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [successMsg, setSuccessMsg] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const [isRegister, setRegisterMode] = useState(false);

    function onSubmit(type: "register" | "login") {
        setErrorMsg("");
        setSuccessMsg("");
        if (!validateEmailFormat(email)) {
            setErrorMsg("Formato de e-mail inválido");
            return;
        }
        if (isRegister && !validatePasswordFormat(password)) {
            setErrorMsg(
                "A senha deve possuir 8 caracteres, com 1 número e 1 letra maiúscula"
            );
            return;
        }
        setLoading(true);

        const request = () =>
            type === "register"
                ? handleRegister(email, password)
                : handleLogin(email, password);

        request().then(({ message, success }) => {
            setLoading(false);
            if (isRegister && success) {
                setErrorMsg("");
                setSuccessMsg(`${message}. Faça login`);
                setRegisterMode(false);
                return;
            }
            if (!success) {
                setErrorMsg(message);
                setSuccessMsg("");
            }
        });
    }

    useEffect(() => {
        setErrorMsg("");
        setSuccessMsg("");
    }, [email, password]);

    return (
        <div className="flex flex-col items-center justify-content h-full w-full">
            <div className="flex w-full h-[600px] m-auto">
                <div className="flex overflow-hidden gap-10 items-center justify-center w-1/2 border-r border-gray-300">
                    <Logo nav={false} />
                </div>
                <div className="relative overflow-hidden flex flex-col items-center justify-center w-1/2">
                    <form className="w-[80%] max-w-[500px] bg-white rounded-lg shadow-md p-6 pb-2s">
                        <div className="font-bold text-xl pb-4">
                            <span>
                                {isRegister ? "Cadastro de usuário" : "Login"}
                            </span>
                        </div>
                        <div className="mb-4">
                            <label className="text-pink-500">Email:</label>
                            <input
                                className="border border-gray-300 text-gray-700 px-3 py-2 rounded-md w-full placeholder-gray-400 "
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="text-pink-500">Password:</label>
                            <input
                                className="border border-gray-300 text-gray-700 px-3 py-2 rounded-md w-full placeholder-gray-400 "
                                type="password"
                                placeholder="Senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="h-10">
                            <span className="mb-4 text-gray-500 text-sm">
                                {loading ? (
                                    <span>Autenticando...</span>
                                ) : errorMsg ? (
                                    <span className="text-red-500">
                                        {errorMsg}
                                    </span>
                                ) : successMsg ? (
                                    <span className="text-green-500">
                                        {successMsg}
                                    </span>
                                ) : (
                                    ""
                                )}
                            </span>
                        </div>
                        <div className="flex items-end">
                            <div
                                className="text-center underline underline-offset-2 cursor-pointer"
                                onClick={() => setRegisterMode(!isRegister)}
                            >
                                {isRegister
                                    ? "Entrar com a minha conta"
                                    : "Não sou cadastrado"}
                            </div>
                            <button
                                className="ml-auto bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-[120px] h-12 "
                                type="button"
                                disabled={loading}
                                onClick={() =>
                                    onSubmit(isRegister ? "register" : "login")
                                }
                            >
                                {isRegister ? "Registrar" : "Entrar"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
