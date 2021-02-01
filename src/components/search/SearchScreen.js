import React, {useMemo} from "react";
import queryString from "query-string";
import {useLocation} from "react-router-dom";
import {useForm} from "../../hooks/useForm";
import {HeroCard} from "../heroes/HeroCard";
import {getHeroesByName} from "../../selectors/getHeroesByName";

export const SearchScreen = ({history}) => {
    // Hook de react router
    const location = useLocation();
    console.log(queryString.parse(location.search));

    // De los parámetros de la url solo me interesa la query (q)
    //Se iguala q a vacío por si en la url no va y evitar error ya que devuelve undefined
    const {q = ""} = queryString.parse(location.search);

    const [formValues, {handleInputChange}] = useForm({
        searchText: q
    });

    //   Desestructuro searchText de formValues
    const {searchText} = formValues;

    // Utilizamos el useMemo ya que no queremos obtener los heroes cada vez que se renderiza
    // Solo se recargará si el id cambia, que se indica con el segundo parámetro del useMemo
    // que son las dependencias. En este caso heorId es el que depende del cambio
    const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);

    const handleSearch = (event) => {
        event.preventDefault();
        history.push(`?q=${searchText}`);
    };

    return (
        <div>
            <h1>Search</h1>
            <hr />

            <div className="row">
                <div className="col-5">
                    <h4>Search form</h4>
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Find a hero..."
                            className="form-control"
                            name="searchText"
                            value={searchText}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                        <button
                            type="submit"
                            className="btn btn-outline-primary m-1"
                        >
                            Search
                        </button>
                    </form>
                </div>
                <div className="col-7">
                    <h4>Results</h4>
                    <hr />

                    {q === "" && (
                        <div className="alert alert-info">Search a hero</div>
                    )}

                    {q !== "" && heroesFiltered.length === 0 && (
                        <div className="alert alert-danger">
                            There isn't a hero with {q}
                        </div>
                    )}

                    {heroesFiltered.map((h) => (
                        <HeroCard key={h.id} {...h} />
                    ))}
                </div>
                <div></div>
            </div>
        </div>
    );
};
