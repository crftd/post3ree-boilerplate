import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignUp from './containers/SignUp';
import SignIn from './containers/SignIn';
import Dashboard from './containers/Dashboard';

export default (
  <Switch>
    <Route path="/" component={ Dashboard }/>
    <Route path="/sign-in" component={ SignIn }/>
    <Route path="/sign-up" component={ SignUp }/>
  </Switch>
);
