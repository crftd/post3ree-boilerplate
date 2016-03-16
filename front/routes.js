/**
 * Created by x22a on 25.02.16.
 */

import React from 'react';
import { Route, IndexRoute } from 'react-router';

import RolandApp from './containers/roland/RolandApp'
import Dashboard from './containers/dashboard/Dashboard'
import AddProject from './containers/add-project/AddProject'

export default (
    <Route path='/'>
        <IndexRoute component={ RolandApp } />
        <Route path="add-project" component={ AddProject } />
        <Route path="dashboard" component={ Dashboard } />
    </Route>
);