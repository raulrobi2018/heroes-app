import React, {useContext} from "react";
import {BrowserRouter as Router, Switch} from "react-router-dom";
import {AuthContext} from "../../auth/AuthContext";
import {LoginScreen} from "../login/LoginScreen";
import {DashboardRoutes} from "./DashboardRoutes";
import {PrivateRoute} from "./PrivateRoute";
import {PublicRoute} from "./PublicRoute";

export const AppRouter = () => {
    //Leemos el usuario del contexto para saber si está autenticado
    const {user} = useContext(AuthContext);

    return (
        <Router>
            <div className="container">
                {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
                <Switch>
                    {/* exact para que machee la ruta exacta */}
                    <PublicRoute
                        exact
                        path="/login"
                        component={LoginScreen}
                        isAutenticated={user.logged}
                    />
                    <PrivateRoute
                        path="/"
                        component={DashboardRoutes}
                        isAutenticated={user.logged}
                    />
                </Switch>
            </div>
        </Router>
    );
};
