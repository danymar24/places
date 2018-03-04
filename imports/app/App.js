import React from 'react';
import { withRouter, BrowserRouter, Switch, Route } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Tracker } from 'meteor/tracker' 

import { HomeScreen } from './components/home/HomeScreen';
import { NavBar } from './components/navBar/NavBar';
import { LoginScreen } from './components/users/LoginScreen';
import { SetPasswordScreen } from './components/users/SetPassword';
import { TerritoriesScreen } from './components/territory/TerritoriesScreen';
import { UsersScreen } from './components/users/UsersScreen';
import { PlacesListScreen } from './components/places/PlacesListScreen';
import { PlacesMapScreen } from './components/places/PlacesMapScreen';
import { Authorization } from './components/authorization/Authorization';
import { AddPlace } from './components/places/AddPlace';

// Todo: Add authorization redirect on page change

@withRouter
export class App extends React.Component {    
    componentWillMount() {
        this.appTracker = Tracker.autorun(() => {
            console.log('authorized', Authorization(['admin']));
        });  
    }
    
    render() {
        return (
            <>
                <NavBar />
                <Switch>
                    <Route path='/home' component={HomeScreen} />
                    <Route path='/login' component={LoginScreen} />
                    <Route path='/set-password/:id' component={SetPasswordScreen} />
                    <Route path='/users' component={UsersScreen} />
                    <Route path='/territories' component={TerritoriesScreen} />
                    <Route path='/places-list' component={PlacesListScreen} />
                    <Route path='/places-map' component={PlacesMapScreen} />
                    <Route path='/add-place' component={AddPlace} />
                    <Route path='*' component={LoginScreen} />
                </Switch>
            </>
        )
    }
}
