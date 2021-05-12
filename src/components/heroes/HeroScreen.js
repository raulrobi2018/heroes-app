import React, {useMemo} from "react";
import {Redirect, useParams} from "react-router-dom";
import {getHeroById} from "../../selectors/getHeroById";
import {heroImages} from "../../helpers/heroImages";

// Aquí extraemos la propiedad history que ya existe en el componente Route
// ya que es agregado por React
export const HeroScreen = ({history}) => {
    // Este hook de React va a extraer los parametros que viajen en la url
    const {heroId} = useParams();

    // Utilizamos el useMemo ya que no queremos obtener el heroe cada vez que se renderiza
    // Solo se recargará si el id cambia, que se indica con el segundo parámetro del useMemo
    // que son las dependencias. En este caso heorId es el que depende del cambio
    const hero = useMemo(() => getHeroById(heroId), [heroId]);

    if (!hero) {
        return <Redirect to="/" />;
    }

    const handleBack = () => {
        // Si el history solo tiene 2 páginas en el historial, se redirecciona
        //al inicio. Esto se puede dar si copian la url y la pegan en un navegador
        if (history.length <= 2) {
            history.push("/");
        } else {
            history.goBack();
        }
    };

    const {
        superhero,
        publisher,
        alter_ego,
        first_appearance,
        characters
    } = hero;

    return (
        <div className="row mt-5">
            <div className="col-4">
                <img
                    src={heroImages(`./${heroId}.jpg`).default}
                    alt={superhero}
                    className="img-thumbnail animate__animated animate__fadeInLeft"
                />
            </div>
            <div className="col-8 animate__animated animate__fadeIn">
                <h3>{superhero}</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <strong>Alter ego: </strong>
                        {alter_ego}
                    </li>
                    <li className="list-group-item">
                        <strong>Publisher: </strong>
                        {publisher}
                    </li>
                    <li className="list-group-item">
                        <strong>First appearance: </strong>
                        {first_appearance}
                    </li>
                </ul>

                <h5>Characters</h5>
                <p>{characters}</p>

                <button className="btn btn-outline-info" onClick={handleBack}>
                    {"< Back"}
                </button>
            </div>
        </div>
    );
};
