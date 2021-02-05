import {mount, configure} from "enzyme";
import {MemoryRouter} from "react-router-dom";
import {PrivateRoute} from "../../components/routers/PrivateRoute";

//Esto es necesario para que no falle el mount en React 17
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
configure({adapter: new Adapter()});
// ------------------------------------------------------

describe("Testing PrivateRoute component", () => {
    const props = {
        location: {
            pathname: "/marvel"
        }
    };

    Storage.prototype.setItem = jest.fn();

    test("should display the component if the user is autenticated and save the localStorage", () => {
        const wrapper = mount(
            // El MemoryRouter es un Higher Order Component creado para poder hacer pruebas de Routes
            //Un Route no se puede utilizar fuera de un Router. Nuestro PrivateRoute retorna un Route,
            //por eso debemos utilizar el MemoryRouter
            <MemoryRouter>
                <PrivateRoute
                    isAutenticated={true}
                    // Envío cualquier componente dentro de una función porque es requerida una function
                    component={() => <span>Listo</span>}
                    {...props}
                />
            </MemoryRouter>
        );

        expect(wrapper.find("span").exists()).toBe(true);
        expect(localStorage.setItem).toHaveBeenCalledWith(
            "lastPath",
            "/marvel"
        );
    });
});
