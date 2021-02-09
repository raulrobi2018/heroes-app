import {mount, configure} from "enzyme";

import {DashboardRoutes} from "../../components/routers/DashboardRoutes";
import {AuthContext} from "../../auth/AuthContext";
import {MemoryRouter} from "react-router-dom";

//Esto es necesario para que no falle el mount en React 17
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
configure({adapter: new Adapter()});
// ------------------------------------------------------

describe("Testing DashboardRoutes component", () => {
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    };

    test("should display the component correctly", () => {
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                {/* // El MemoryRouter es un Higher Order Component creado para
                poder hacer pruebas de Routes. Un Route no se puede utilizar
                fuera de un Router. Nuestro PrivateRoute retorna un Route, por
                eso debemos utilizar el MemoryRouter */}
                <MemoryRouter>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect(wrapper).toMatchSnapshot();

        //Realizamos otra prueba de existencia
        //Busco que el span que tiene el nombre del usuario esté vacío
        expect(wrapper.find(".text-info").text().trim()).toBe("");
    });
});
