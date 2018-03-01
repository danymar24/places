import React from 'react';
import { withRouter, BrowserRouter, Switch, Route } from 'react-router-dom';
import { observer } from 'mobx-react';

import { HomeScreen } from './components/home/HomeScreen';
import { NavBar } from './components/navBar/NavBar';
import { LoginScreen } from './components/users/LoginScreen';
import { SetPasswordScreen } from './components/users/SetPassword';
import { TerritoriesScreen } from './components/territory/TerritoriesScreen';
import { UsersScreen } from './components/users/UsersScreen';

// Todo: Add authorization redirect on page change
// Todo: change to authenticated https://github.com/cleverbeagle/pup/blob/master/imports/ui/components/Authenticated/Authenticated.js

@withRouter
export class App extends React.Component {

    authenticate = (nextState, replace) => {
        if (!Meteor.loggingIn() && !Meteor.userId()) {
          replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname },
          });
        }
    };

    render() {

        return (
            <>
                <NavBar />
                <Switch>
                    <Route path='/home' component={HomeScreen} />
                    <Route path='/login' component={LoginScreen} />
                    <Route path='/set-password/:id' component={SetPasswordScreen} onEnter={ this.authenticate }/>
                    <Route path='/territories' component={TerritoriesScreen} onEnter={ this.authenticate }/>
                    <Route path='/users' component={UsersScreen} onEnter={ this.authenticate }/>
                    <Route path='*' component={LoginScreen} />
                </Switch>
            </>
        )
    }
}
