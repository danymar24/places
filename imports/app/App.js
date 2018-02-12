import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { HomeScreen } from './components/home/HomeScreen';
import { NavBar } from './components/navBar/NavBar';
import { TerritoriesScreen } from './components/territory/TerritoriesScreen';

export class App extends React.Component {
    render() {
        return (
            <>
                <NavBar />
                <Switch>
                    <Route path='/home' component={HomeScreen} />
                    <Route path='/territories' component={TerritoriesScreen} />
                </Switch>
            </>
        )
    }
}
