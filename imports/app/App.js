import React from 'react';
import { withRouter, BrowserRouter, Switch, Route } from 'react-router-dom';

import { Authorization } from './components/authorization/Authorization';
import { SessionStore } from './components/authorization/SessionStore';
import { HomeScreen } from './components/home/HomeScreen';
import { NavBar } from './components/navBar/NavBar';
import { LoginScreen } from './components/users/LoginScreen';
import { SetPasswordScreen } from './components/users/SetPassword';
import { TerritoriesScreen } from './components/territory/TerritoriesScreen';
import { UsersScreen } from './components/users/UsersScreen';

// Todo: Add authorization redirect on page change
// Todo: Test authorization hoc: https://hackernoon.com/role-based-authorization-in-react-c70bb7641db4
// route change detect: https://zach.codes/hooking-into-route-changes-in-react-router-v4/

@withRouter
export class App extends React.Component {
    componentWillMount() {
        Meteor.call('users.getPermissions', (err, success) => {
            if (err) {
                console.log(err);
            } else if(success) {
                SessionStore.setLoggedInUser(success);
            }
        })
    }

    componentDidUpdate (prevProps) {
        let { location: { pathname } } = this.props
    
        if (prevProps.location.pathname === pathname) {
            console.log('changed page');
        }
      }

    render() {
        const User = Authorization(['user', 'editor', 'admin']);
        const Editor = Authorization(['editor', 'admin']);
        const Admin = Authorization(['admin']);
        return (
            <>
                <NavBar />
                <Switch>
                    <Route path='/home' component={HomeScreen} />
                    <Route path='/login' component={LoginScreen} />
                    <Route path='/set-password/:id' component={SetPasswordScreen} />
                    <Route path='/territories' component={User(TerritoriesScreen)} />
                    <Route path='/users' component={Admin(UsersScreen)} />
                </Switch>
            </>
        )
    }
}
