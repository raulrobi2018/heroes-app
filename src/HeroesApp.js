import React, {useEffect, useReducer} from "react";
import {authReducer} from "./auth/authReducer";
import {AppRouter} from "./components/routers/AppRouter";
import {AuthContext} from "./auth/AuthContext";

//Defino el estado inicial
const init = () => {
    //Si el localStorage es null, entonces devuelvo logged en false
    return JSON.parse(localStorage.getItem("user")) || {logged: false};
};

export const HeroesApp = () => {
    const [user, dispatch] = useReducer(authReducer, {}, init);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    return (
        //Distribuyo el user y el dispatch con el AuthContext
        <AuthContext.Provider value={{user, dispatch}}>
            <AppRouter />
        </AuthContext.Provider>
    );
};
