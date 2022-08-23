import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {routes} from "../../../services/api-routes";

function Routing(props) {

    return (
        <Switch>
            <Route exact path={`/`} component={<div>Hi</div>} />
            <Redirect to="/" />
            <Route path="/">
                <p className="flex all-center h-100vh">Not found</p>
            </Route>
        </Switch>
    );
}


export default Routing;
