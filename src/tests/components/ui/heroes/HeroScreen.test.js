import {mount, configure} from "enzyme";

import {MemoryRouter, Router} from "react-router-dom";

import "@testing-library/jest-dom";

//Esto es necesario para que no falle el mount en React 17
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import {HeroScreen} from "../../../../components/heroes/HeroScreen";
configure({adapter: new Adapter()});
// ------------------------------------------------------

describe("Testing HeroScreen component", () => {
    const historyMock = {
        length: 10,
        goBack: jest.fn(),
        push: jest.fn()
    };

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: true,
            name: "Pedro"
        }
    };

    const wrapper = mount(
        <MemoryRouter initialEntries={["/hero"]}>
            <HeroScreen history={history} />
        </MemoryRouter>
    );

    test("should display the redirect component if not arguments passed", () => {
        expect(wrapper.find("Redirect").exists()).toBe(true);
    });
});
