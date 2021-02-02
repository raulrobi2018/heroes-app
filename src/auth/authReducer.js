import {types} from "../types/types";

export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case types.login:
            return {
                // Retorna todo lo que venga en el payload
                ...action.payload,
                logged: true
            };
            break;

        case types.logout:
            return {
                logged: false
            };

        default:
            return state;
    }
};
