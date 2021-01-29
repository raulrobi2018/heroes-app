import React, {useMemo} from "react";
import {getHeroesByPublisher} from "../../selectors/getHeroesByPublisher";
import {HeroCard} from "./HeroCard";

export const HeroesList = ({publisher}) => {
    // Utilizamos el useMemo ya que no queremos generar los heroes cada vez que se renderiza
    // Solo se recargará si el publisher cambia, que se indica con el segundo parámetro del useMemo
    // que son las dependencias. En este caso publisher es el que depende del cambio
    const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher]);

    return (
        <div className="card-columns animate__animated animate__fadeIn">
            {heroes.map((h) => (
                <HeroCard key={h.id} {...h} />
            ))}
        </div>
    );
};
