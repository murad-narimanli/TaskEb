import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import Dashboard from "../../Pages/Dashboard";
import Users from "../../Pages/Users";
import UserSettings from "../../Pages/UserSettings";
import Projects from "../../Pages/Projects";
import Tasks from "../../Pages/Tasks";
import Permission from "../../Elements/Permission";
import BackLog from "../../Pages/BackLog";


function Routing(props) {

    return (
        <Switch>
            <Route exact path={`/`} component={Dashboard} />
            <Route exact path={`/user-settings`} component={UserSettings} />
            <Route exact path={`/projects`} component={Projects} />
            <Permission type={'admin'}>
                <Route exact path={`/users`} component={Users} />
            </Permission>
            <Route exact path={`/tasks/:id`} component={Tasks} />
            <Route exact path={`/tasks/:id`} component={BackLog} />
            <Redirect to="/" />
            <Route path="/">
                <p className="flex all-center h-100vh">Not found</p>
            </Route>
        </Switch>
    );
}

export default Routing;


