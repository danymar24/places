import React from 'react';

export class SetPasswordScreen extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            user: {},
            email: '',
            password: '',
            passwordVerify: ''
        }
    }

    componentDidMount() {
        this.setPasswordTracker = Tracker.autorun(() => {
            Meteor.subscribe('users');
            const user = Meteor.users.find({ _id: this.props.match.params.id}).fetch()[0];
            if (user) {
                this.setState({
                    user,
                    email: user.emails[0].address
                });
            }
        });
    }
    
    
    setPassword = (e) => {
        e.preventDefault();
        const { email, password, user } = this.state;
        const data = {
            id: user._id,
            email,
            password
        }

        Meteor.call('users.setUserPassword', data, (err, success) => {
            if (err) {
                console.log(err);
                M.toast({html: err.reason}, 4000);
            } else {
                M.toast({html: 'Password set'}, 4000);
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
                        <span className='card-title'>Set password</span>
                        <form onSubmit={this.setPassword}>
                            <div className="row">
                                <div className="input-field">
                                    <input onChange={e => this.setState({ email: e.target.value })} 
                                           type="email" 
                                           className="validate"
                                           value={this.state.email} />
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
                            <div className="row">
                                <div className="input-field">
                                    <input onChange={e => this.setState({ passwordVerify: e.target.value })} 
                                           type="password" 
                                           className={`validate ${this.state.password !== this.state.passwordVerify ? 'invalid' : ''}`}/>
                                    <label>Password verification</label>
                                </div>
                            </div>
                            <div className='row right-align'>
                                <button className='btn waves-effect waves-light'
                                        disabled={ this.state.email.length <= 0 || 
                                                   this.state.password <= 0 || this.state.password !== this.state.passwordVerify}>
                                    Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
