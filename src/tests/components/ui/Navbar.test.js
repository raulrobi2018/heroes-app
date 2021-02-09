import {mount, configure} from "enzyme";

import {AuthContext} from "../../../auth/AuthContext";
import {MemoryRouter, Router} from "react-router-dom";

import {Navbar} from "../../../components/ui/Navbar";
import {types} from "../../../types/types";

import "@testing-library/jest-dom";

//Esto es necesario para que no falle el mount en React 17
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
configure({adapter: new Adapter()});
// ------------------------------------------------------

describe("Testing Navbar component", () => {
    const historyMock = {
        push: jest.fn(),
        replace: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn()
    };

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: "Pedro"
        }
    };

    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            {/* // El MemoryRouter es un Higher Order Component creado para
            poder hacer pruebas de Routes. Un Route no se puede utilizar
            fuera de un Router. Nuestro PrivateRoute retorna un Route, por
            eso debemos utilizar el MemoryRouter */}
            <MemoryRouter>
                <Router history={historyMock}>
                    <Navbar />
                </Router>
            </MemoryRouter>
        </AuthContext.Provider>
    );

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("should display the component correctly", () => {
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find(".text-info").text().trim()).toBe("Pedro");
    });

    test("should call the logout and use the history prop", () => {
        //Esto es lo mismo que hacer el 'simulate'
        wrapper.find("button").prop("onClick")();
        expect(contextValue.dispatch).toHaveBeenCalledWith({
            type: types.logout
        });

        expect(historyMock.replace).toHaveBeenCalledWith("/login");
    });
});
