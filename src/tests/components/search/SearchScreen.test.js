import {mount, configure} from "enzyme";

import {MemoryRouter, Route, Router} from "react-router-dom";

import "@testing-library/jest-dom";

//Esto es necesario para que no falle el mount en React 17
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import {SearchScreen} from "../../../components/search/SearchScreen";
configure({adapter: new Adapter()});
// ------------------------------------------------------

describe("Testing SearchScreen component", () => {
    test("should display the component correctly with default values", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/search"]}>
                <Route path="/search" component={SearchScreen}></Route>
            </MemoryRouter>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find(".alert-info").text().trim()).toBe("Search a hero");
    });

    test("should display Batman and the input with the queryString value", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/search?q=batman"]}>
                <Route path="/search" component={SearchScreen}></Route>
            </MemoryRouter>
        );

        expect(wrapper.find("input").prop("value")).toBe("batman");
    });

    test("should display an error if the hero do not exist", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/search?q=batman123"]}>
                <Route path="/search" component={SearchScreen}></Route>
            </MemoryRouter>
        );

        expect(wrapper.find(".alert-danger").exists()).toBe(true);
    });

    test("should call the push history", () => {
        const history = {
            push: jest.fn()
        };
        const wrapper = mount(
            <MemoryRouter initialEntries={["/search?q=batman123"]}>
                <Route
                    path="/search"
                    component={() => <SearchScreen history={history} />}
                ></Route>
            </MemoryRouter>
        );

        //Primero se carga el valor en el campo de texto
        wrapper.find("input").simulate("change", {
            target: {
                name: "searchText",
                value: "batman"
            }
        });

        //Luego se llama al onSubmit del formulario
        wrapper.find("form").prop("onSubmit")({
            preventDefault() {}
        });

        expect(history.push).toHaveBeenCalledWith(`?q=batman`);
    });
});
