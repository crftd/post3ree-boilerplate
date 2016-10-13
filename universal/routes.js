import React from 'react'
import { Route, IndexRoute } from 'react-router'

import Main from './containers/Main/Main'
import SignUp from './containers/SignUp/SignUp'
import SignIn from './containers/SignIn/SignIn'

export default (
    <Route path='/'>
        <IndexRoute component={ Main } />
        <Route path="sign-in" component={ SignIn } />
        <Route path="sign-up" component={ SignUp } />
    </Route>
);