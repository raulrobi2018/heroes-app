import {mount, configure} from "enzyme";

import {MemoryRouter, Route, Router} from "react-router-dom";
import {LoginScreen} from "../../../components/login/LoginScreen";

import "@testing-library/jest-dom";

//Esto es necesario para que no falle el mount en React 17
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import {AuthContext} from "../../../auth/AuthContext";
import {types} from "../../../types/types";
configure({adapter: new Adapter()});
// ------------------------------------------------------

describe("Testing LoginScreen component", () => {
    const history = {
        replace: jest.fn()
    };

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    };

    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <LoginScreen history={history} />
        </AuthContext.Provider>
    );

    test("should display the component correctly", () => {
        expect(wrapper).toMatchSnapshot();
    });

    test("should do the dispatch and the navigation", () => {
        const handleClick = wrapper.find("button").prop("onClick");

        handleClick();

        // Primero probar y ver cual es el payload que pide y le ponemos lo mismo
        expect(contextValue.dispatch).toHaveBeenCalledWith({
            type: types.login,
            payload: {
                name: "Raul"
            }
        });

        //Prueba el history.replace
        expect(history.replace).toHaveBeenCalledWith("/");

        //Pruebas del localStorage
        localStorage.setItem("lastPath", "/dc");
        handleClick();
        expect(history.replace).toHaveBeenCalledWith("/dc");
    });
});
