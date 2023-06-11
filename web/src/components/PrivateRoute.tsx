import React, { useContext } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

const PrivateRoute: React.FC<RouteProps> = ({ ...props }) => {
    const { isLogged } = useContext(AuthContext);

    if (!isLogged()) {
        return <Redirect to="/login" />;
    }

    return <Route {...props} />;
};

export default PrivateRoute;
