import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { HomeScreen } from './components/home/HomeScreen';
import { NavBar } from './components/navBar/NavBar';
import { LoginScreen } from './components/users/LoginScreen';
import { TerritoriesScreen } from './components/territory/TerritoriesScreen';
import { UsersScreen } from './components/users/UsersScreen';

export class App extends React.Component {
    render() {
        return (
            <>
                <NavBar />
                <Switch>
                    <Route path='/home' component={HomeScreen} />
                    <Route path='/login' component={LoginScreen} />
                    <Route path='/territories' component={TerritoriesScreen} />
                    <Route path='/users' component={UsersScreen} />
                </Switch>
            </>
        )
    }
}
