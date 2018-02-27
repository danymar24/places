import React from 'react';

export class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    
    login = (e) => {
        e.preventDefault();
        const { email, password } = this.state;

        Meteor.loginWithPassword(email, password, (err, success) => {
            if (err) {
                M.toast({html: err.reason}, 4000);
            } else {
                this.props.history.replace('/territories');
            }
        });
    }

    render() {
        return (
            <div id='login' 
                 className='valign-wrapper'>
                <div className='card'>
                    <div className='card-content'>
                        <span className='card-title'>Login</span>
                        <form onSubmit={this.login}>
                            <div className="row">
                                <div className="input-field">
                                    <input onChange={e => this.setState({ email: e.target.value })} 
                                           type="email" 
                                           className="validate"/>
                                    <label>Email</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field">
                                    <input onChange={e => this.setState({ password: e.target.value })} 
                                           type="password" 
                                           className="validate"/>
                                    <label>Password</label>
                                </div>
                            </div>
                            <div className='row right-align'>
                                <button className='btn waves-effect waves-light'
                                        disabled={ this.state.email.length <= 0 || 
                                                   this.state.password <= 0}>
                                    Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
