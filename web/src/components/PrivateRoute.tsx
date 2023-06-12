import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

const PrivateRoute = () => {
    const { session, checkedStorage } = useContext(AuthContext);

    if (!checkedStorage) {
        return <span>Verificando sessão...</span>;
    }
    return session?.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
