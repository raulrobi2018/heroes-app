import {mount, configure} from "enzyme";

import {MemoryRouter, Route, Router} from "react-router-dom";
import {LoginScreen} from "../../../components/login/LoginScreen";

import "@testing-library/jest-dom";

//Esto es necesario para que no falle el mount en React 17
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import {AuthContext} from "../../../auth/AuthContext";
import {types} from "../../../types/types";
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
});
