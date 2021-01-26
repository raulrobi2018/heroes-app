import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {MarvelScreen} from "../marvel/MarvelScreen";
import {DcScreen} from "../dc/DcScreen";
import {Navbar} from "../ui/Navbar";
import {HeroScreen} from "../heroes/HeroScreen";

export const DashboardRoutes = () => {
    return (
        <>
            <Navbar />
            <div className="container mt-2">
                <Switch>
                    <Route exact path="/marvel" component={MarvelScreen} />
                    <Route exact path="/hero/:heroId" component={HeroScreen} />
                    <Route exact path="/dc" component={DcScreen} />

                    {/* Si no encuentra ningún path, lo redirige a marvel */}
                    <Redirect to="/marvel" />
                </Switch>
            </div>
        </>
    );
};
