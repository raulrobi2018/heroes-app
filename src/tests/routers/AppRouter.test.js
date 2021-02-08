import {mount, configure} from "enzyme";

import {AuthContext} from "../../auth/AuthContext";
import {AppRouter} from "../../components/routers/AppRouter";

//Esto es necesario para que no falle el mount en React 17
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
configure({adapter: new Adapter()});
// ------------------------------------------------------

describe("Testing AppRouter component", () => {
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    };

    test("should display the LoginScreen if the user is not authenticated", () => {
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        );

        expect(wrapper).toMatchSnapshot();
    });

    test("should display the Marvel component if authenticated", () => {
        const contextValue = {
            dispatch: jest.fn(),
            user: {
                logged: true,
                name: "Jorge"
            }
        };
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        );

        expect(wrapper.find(".navbar").exists()).toBe(true);
    });
});
