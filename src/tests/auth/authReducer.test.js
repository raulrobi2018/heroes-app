import {authReducer} from "../../auth/authReducer";
import {types} from "../../types/types";

describe("Testing authReducer", () => {
    test("should return the default state", () => {
        // El segundo parámetro correspondiente a la acción,
        //se envía vacío o sea que utilizará la acción por defecto
        const state = authReducer({logged: false}, {});
        expect(state).toEqual({logged: false});
    });

    test("should authenticate and set the user name", () => {
        const action = {
            type: types.login,
            payload: {
                name: "Raul"
            }
        };

        const state = authReducer({logged: false}, action);
        expect(state).toEqual({logged: true, name: "Raul"});
    });

    test("should remove the user login data", () => {
        const action = {
            type: types.logout
        };

        const state = authReducer({logged: true, name: "Jorge"}, action);
        expect(state).toEqual({logged: false});
    });
});
