import React from 'react';
import { DataGrid } from '../grid/DataGrid';
import { AddUser } from './AddUser';



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

    componentWillUnmount() {
        this.usersTracker.stop();
    }

    openAddModal = (e) => {
        this.addUserModal.open();
    }

    deleteUser = (id) => {
        Meteor.call('users.remove', id, (err, success) => {
            if (err) {
                M.toast({ html: err.reason }, 4000);
            } else {
                M.toast({ html: 'User deleted'}, 4000);
            }
        });
    }

    editUser = (id) => {
        console.log(object);
    }
    
    render() {
        const columns = [
            {
                header: 'Name',
                bind: 'address'
            },
            {
                header: 'Lastname',
                bind: 'city'
            },
            {
                header: 'Email',
                bind: 'state'
            },
            {
                header: 'Role',
                bind: 'profile.role'
            },
            {
                header: 'Edit',
                bind: '_id',
            },
            {
                header: 'Delete',
                bind: '_id',
                buttonText: '',
                className: `btn waves-effect waves-ligh red darken-3`,
                icon: <i className='material-icons'>delete</i>
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
                <DataGrid className={`striped highlight`}
                          columns={columns} 
                          data={this.state.users} 
                          delete={this.deleteUser}/>
                <AddUser modal={this.addUserModal} />
            </div>
        );
    }
}
