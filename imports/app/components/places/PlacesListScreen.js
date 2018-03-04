import React from 'react';
import { Link } from 'react-router-dom';
import { Tracker } from 'meteor/tracker';

import { Places } from '../../../api/places';
import { DataGrid } from '../grid/DataGrid';

// todo: create places list
// todo: create add place: https://github.com/kenny-hibino/react-places-autocomplete

export class PlacesListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            places: []
        }   
    }

    componentDidMount() {
        this.placesTracker = Tracker.autorun(() => {
            Meteor.subscribe('places');
            const places = Places.find().fetch();
            this.setState({
                places
            });
        });
    }

    removePlace = (id) => {
        Meteor.call('places.remove', id, (err, success) => {
            if (err) {
                M.toast({html: err.reason}, 4000);
            } else {
                M.toast({html: 'Place removed.'}, 4000);
            }
        });
    }

    componentWillUnmount() {
        this.placesTracker.stop();
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
                bind: 'emails.0.address'
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
                <h4>Places
                    <Link to='/add-place'
                          className='btn-floating btn-small waves-effect waves-light' >
                        <i className='material-icons'>add</i>
                    </Link>
                </h4>
                <DataGrid columns={columns} 
                          data={this.state.places} 
                          delete={this.removePlace} />
            </div>
        );
    }
}