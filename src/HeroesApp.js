import React, {useReducer} from "react";
import {authReducer} from "./auth/authReducer";
import {AppRouter} from "./components/routers/AppRouter";
import {AuthContext} from "./auth/AuthContext";

export const HeroesApp = () => {
    //Defino el estado inicial
    const init = () => {
        //Si el localStorage es null, entonces devuelvo logged en false
        return JSON.parse(localStorage.getItem("user")) || {logged: false};
    };

    const [user, dispatch] = useReducer(authReducer, {}, init);

    return (
        //Distribuyo el user y el dispatch con el AuthContext
        <AuthContext.Provider value={{user, dispatch}}>
            <AppRouter />
        </AuthContext.Provider>
    );
};
