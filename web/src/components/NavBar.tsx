import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Logo from "../components/Logo";

const NavBar = () => {
    const { session, handleLogout } = useContext(AuthContext);

    return (
        <nav className="flex bg-neutral-900 h-20 justify-between items-center fixed w-full">
            <div className="text-pink-500 font-bold text-base ml-6">
                Olá, {session?.email}
            </div>
            <div className="text-white font-bold text-xl absolute w-full text-center pointer-events-none">
                <Logo nav />
            </div>
            <div
                onClick={handleLogout}
                className="py-2 px-4 cursor-pointer mr-10 hover:bg-pink-500 hover:border-pink-500 text-white w-30 h-10 border border-white rounded"
            >
                Sair
            </div>
        </nav>
    );
};

export default NavBar;
