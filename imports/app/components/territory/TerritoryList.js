import React from 'react';
import { Tracker } from 'meteor/tracker';

import { Territories } from '../../../api/territories';

export class TerritoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            territories: []
        }
    }
    
    componentDidMount() {
        const territoriesTracker = Tracker.autorun(() => {
            Meteor.subscribe('territories');
            const territories = Territories.find();
            this.setState({
                territories
            })
        })    
    }

    render() {
        const territories = this.state.territories.map(territory => {
            return <li className='collection-item'>{territory.name}</li>
        })
        return (
            <ul className='collection with-header'>
                <li className='collection-header'><h4>Territories</h4></li>
                {territories}
            </ul>
        );
    }
}
