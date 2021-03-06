import React, {useContext, useReducer} from "react";
import {AuthContext} from "../../auth/AuthContext";
import {types} from "../../types/types";

// Aquí extraemos la propiedad history que ya existe en el componente Route
// ya que es agregado por React
export const LoginScreen = ({history}) => {
    //Defino el estado inicial
    const init = () => {
        //Si el localStorage es null, entonces devuelvo logged en false
        return JSON.parse(localStorage.getItem("user")) || {logged: false};
    };

    //Obtengo el dispatch del contexto de la aplicación
    const {dispatch} = useContext(AuthContext);

    const handleLogin = () => {
        //Si el localStorage fue borrado o el atributo aún no ha sido creado, devuelve "/"
        const lastPath = localStorage.getItem("lastPath") || "/";

        dispatch({
            type: types.login,
            payload: {
                name: "Raul"
            }
        });

        history.replace(lastPath);
    };

    return (
        <div className="container mt-5">
            <h1>Login</h1>
            <hr />
            <button className="btn btn-primary" onClick={handleLogin}>
                Login
            </button>
        </div>
    );
};
