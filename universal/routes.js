import React from 'react'/* global __DEV__:true */
import { Route, IndexRoute } from 'react-router'

import Main from './containers/Main'
import SignUp from './containers/SignUp'
import SignIn from './containers/SignIn'

export default (
    <Route path='/'>
        <IndexRoute component={ Main } />
        <Route path="sign-in" component={ SignIn } />
        <Route path="sign-up" component={ SignUp } />
    </Route>
);