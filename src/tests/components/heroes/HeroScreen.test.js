import {mount, configure} from "enzyme";

import {MemoryRouter, Route, Router} from "react-router-dom";

import "@testing-library/jest-dom";

//Esto es necesario para que no falle el mount en React 17
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import {HeroScreen} from "../../../components/heroes/HeroScreen";
configure({adapter: new Adapter()});
// ------------------------------------------------------

describe("Testing HeroScreen component", () => {
    const history = {
        length: 10,
        goBack: jest.fn(),
        push: jest.fn()
    };

    test("should display the redirect component if not arguments passed", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/hero"]}>
                <HeroScreen history={history} />
            </MemoryRouter>
        );
        expect(wrapper.find("Redirect").exists()).toBe(true);
    });

    test("should display a Hero if the param exists and is founded", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
                <Route path="/hero/:heroId" component={HeroScreen} />
            </MemoryRouter>
        );

        expect(wrapper.find("img").exists()).toBe(true);
    });

    test("should go back to the previous screen with push", () => {
        const history = {
            length: 1,
            goBack: jest.fn(),
            push: jest.fn()
        };
        const wrapper = mount(
            <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
                {/* Las props son las que provee el Route. En este caso no se usan pero es para saber que están disponibles */}
                <Route
                    path="/hero/:heroId"
                    component={(props) => <HeroScreen history={history} />}
                />
            </MemoryRouter>
        );

        wrapper.find("button").prop("onClick")();

        expect(history.push).toHaveBeenCalledWith("/");
        expect(history.goBack).not.toHaveBeenCalled();
    });

    test("should go back to the previous screen with goBack", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
                {/* Las props son las que provee el Route. En este caso no se usan pero es para saber que están disponibles */}
                <Route
                    path="/hero/:heroId"
                    component={(props) => <HeroScreen history={history} />}
                />
            </MemoryRouter>
        );

        wrapper.find("button").prop("onClick")();

        expect(history.goBack).toHaveBeenCalled();
        expect(history.push).toHaveBeenCalledTimes(0);
    });

    test("should call the Redirect if the hero do not exist", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/hero/marvel-spider65465465"]}>
                <Route
                    path="/hero/:heroId"
                    component={() => <HeroScreen history={history} />}
                />
            </MemoryRouter>
        );

        expect(wrapper.text()).toBe("");
    });
});
