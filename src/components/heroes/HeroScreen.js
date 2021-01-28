import React from "react";
import {Redirect, useParams} from "react-router-dom";
import {getHeroById} from "../../selectors/getHeroById";

// Aquí extraemos la propiedad history que ya existe en el componente Route
// ya que es agregado por React
export const HeroScreen = ({history}) => {
    // Este hook de React va a extraer los parametros que viajen en la url
    const {heroId} = useParams();

    const hero = getHeroById(heroId);

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
                    src={`../assets/heroes/${heroId}.jpg`}
                    alt={superhero}
                    className="img-thumbnail"
                />
            </div>
            <div className="col-8">
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
