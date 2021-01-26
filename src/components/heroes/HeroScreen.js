import React from "react";
import {Redirect, useParams} from "react-router-dom";
import {getHeroById} from "../../selectors/getHeroById";

export const HeroScreen = () => {
    // Este hook de React va a extraer los parametros que viajen en la url
    const {heroId} = useParams();

    const hero = getHeroById(heroId);

    if (!hero) {
        return <Redirect to="/" />;
    }

    const {
        superhero,
        publisher,
        alter_ego,
        first_appearance,
        characters
    } = hero;

    return (
        <div>
            <h1>HeroScreen</h1>
        </div>
    );
};
