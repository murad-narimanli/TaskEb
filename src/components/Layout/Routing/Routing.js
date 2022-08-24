import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Users from "../../Pages/Users";
import UserSettings from "../../Pages/UserSettings";
import Tasks from "../../Pages/Tasks";
import Permission from "../../Elements/Permission";


function Routing(props) {

    return (
        <Switch>
            <Route exact path={`/user-settings`} component={UserSettings} />
            <Route exact path={`/`} component={Tasks} />
            <Route exact path={`/tasks`} component={Tasks} />
            <Permission type={'admin'}>
                <Route exact path={`/users`} component={Users} />
            </Permission>
            <Redirect to="/" />
            <Route path="/">
                <p className="flex all-center h-100vh">Not found</p>
            </Route>
        </Switch>
    );
}

export default Routing;


