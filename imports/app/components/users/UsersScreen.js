import React from 'react';
import { DataGrid } from '../grid/DataGrid';
import { AddUser } from './AddUser';

// Todo: Add delete user
// Add roles

export class UsersScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        this.usersTracker = Tracker.autorun(() => {
            Meteor.subscribe('users');
            const users = Meteor.users.find().fetch();
            this.setState({
                users
            });
        });
        const elem = document.querySelector('.modal');
        this.addUserModal = M.Modal.init(elem, {});
    }

    openAddModal = (e) => {
        this.addUserModal.open();
    }
    
    render() {
        const columns = [
            {
                header: 'Name',
                bind: 'profile.firstName'
            },
            {
                header: 'Lastname',
                bind: 'profile.lastName'
            },
            {
                header: 'Email',
                bind: 'emails[0].address'
            }
        ]

        return (
            <div className='container'>
                <h4>Users 
                    <button className='btn-floating btn-small waves-effect waves-light'
                            onClick={this.openAddModal} >
                        <i className='material-icons'>add</i>
                    </button>
                </h4>
                <DataGrid className='striped highlight'
                          columns={columns} 
                          data={this.state.users} />
                <AddUser />
            </div>
        );
    }
}
