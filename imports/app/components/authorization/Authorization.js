import React from 'react';
import { SessionStore } from './SessionStore';

export const Authorization = (allowedRoles) => 
    (WrappedComponent) =>{
        return class WithAuthorization extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    user: SessionStore.getLoggedInUser()
                }
            }

            componentWillMount() {
                let role = SessionStore.userRole();
                if (allowedRoles.includes(role)) {
                    return <WrappedComponent {...this.props} />
                } else {
                    return <h1>You dont have access to this page</h1>
                }
            }
        }
    }