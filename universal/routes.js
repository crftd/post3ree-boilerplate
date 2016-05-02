/**
 * Created by x22a on 25.02.16.
 */

import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Main from './containers/main/Main'
import Dashboard from './containers/dashboard/Dashboard'
import AddProject from './containers/add-project/AddProject'
import SignUp from './containers/sign-up/SignUp'
import SignIn from './containers/sign-in/SingIn'

export default (
    <Route path='/'>
        <IndexRoute component={ Main } />
        <Route path="add-project" component={ AddProject } />
        <Route path="dashboard" component={ Dashboard } />
        <Route path="sign-in" component={ SignIn } />
        <Route path="signup" component={ SignUp } />
    </Route>
);