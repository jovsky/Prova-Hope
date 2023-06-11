import { Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import history from "./history";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

function App() {
    return (
        <AuthProvider>
            <Router history={history}>
                <Switch>
                    <Route exact path={["/", "/login"]} component={Login} />
                    <PrivateRoute
                        exact
                        path="/dashboard"
                        component={Dashboard}
                    />
                </Switch>
            </Router>
        </AuthProvider>
    );
}

export default App;
