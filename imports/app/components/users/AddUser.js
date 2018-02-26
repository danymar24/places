import React from 'react';

export class AddUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: ''
        }
    }
    
    insertUser = () => {
        const { email, firstName, lastName } = this.state;
        const profile = {
            firstName,
            lastName
        }
        Meteor.call('users.insert', email, profile, (err, success) => {
            if (err) {
                M.toast({html: err.reason}, 4000);
            } else {
                M.toast({html: 'User created.'}, 4000);
            }
        });
    }

    render() {
        return (
            <div id='addUserModal' className='modal'>
                <div className='modal-content'>
                    <h4>Add user</h4>
                    <form onSubmit={this.insertUser}>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="first_name" 
                                       type="text" 
                                       className="validate"
                                       onChange={ e => this.setState({ firstName: e.target.value})} />
                                <label>First Name</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="last_name" 
                                       type="text" 
                                       className="validate"
                                       onChange={ e => this.setState({ lastName: e.target.value})} />
                                <label>Last Name</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="email" 
                                       type="email" 
                                       className="validate"
                                       onChange={ e => this.setState({ email: e.target.value})} />
                                <label>Email</label>
                            </div>
                        </div>
                    </form>
                </div>
                <div className='modal-footer'>
                    <button className='btn waves-effect waves-light'
                            onClick={this.insertUser} >
                        Add user
                    </button>
                    <a href='#' 
                       className='modal-action modal-close waves-effect waves-light btn-flat'>
                        Cancel</a>
                </div>
            </div>
        );
    }
}
