import {heroes} from "../data/heroes";

export const getHeroesByName = (name) => {
    if (name === "") {
        return [];
    }

    return heroes.filter((h) =>
        h.superhero.toLocaleLowerCase().includes(name.toLocaleLowerCase())
    );
};
