import React from "react";

// Aquí extraemos la propiedad history que ya existe en el componente Route
// ya que es agregado por React
export const LoginScreen = ({history}) => {
    const handleLogin = () => {
        // history.push("/");
        history.replace("/");
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
