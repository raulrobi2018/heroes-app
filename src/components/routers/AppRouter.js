import React, {useContext} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {AuthContext} from "../../auth/AuthContext";
import {LoginScreen} from "../login/LoginScreen";
import {DashboardRoutes} from "./DashboardRoutes";
import {PrivateRoute} from "./PrivateRoute";

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
                    <Route exact path="/login" component={LoginScreen} />
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
