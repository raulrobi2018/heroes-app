import React from "react";
import { heroes } from "../../data/heroes";
import { useForm } from "../../hooks/useForm";
import { HeroCard } from "../heroes/HeroCard";

export const SearchScreen = () => {
  const heroesFiltered = heroes;

  const [formValues, { handleInputChange }] = useForm({
    searchText: ""
  });

  //   Desestructuro searchText de formValues
  const { searchText } = formValues;

  const handleSearch = (event) => {
    event.preventDefault();
    console.log(searchText);
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
              className="btn btn-block btn-outline-primary m-1"
            >
              Search
            </button>
          </form>
        </div>
        <div className="col-7">
          <h4>Results</h4>
          <hr />
          {heroesFiltered.map((h) => (
            <HeroCard key={h.id} {...h} />
          ))}
        </div>
        <div></div>
      </div>
    </div>
  );
};
