import React from 'react';
import { Tracker } from 'meteor/tracker';

import { Places } from '../../../api/places';

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
            <div>
                This is places list screen!!
            </div>
        );
    }
}