import React from "react";

export const SearchScreen = () => {
    return (
        <div>
            <h1>Search</h1>
            <hr />

            <div className="row">
                <div className="col-5">
                    <h4>Search form</h4>
                    <form>
                        <input
                            type="text"
                            placeholder="Find a hero..."
                            className="form-control"
                        />
                    </form>
                    <button
                        type="submit"
                        className="btn btn-block btn-outline-primary m-1"
                    ></button>
                </div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};
