import React from 'react';
import { Tracker } from 'meteor/tracker';

import { Territories } from '../../../api/territories';
import { TerritoryStore } from './TerritoryStore';

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
            const territories = Territories.find().fetch();
            this.setState({
                territories
            })
        })    
    }
    
    setAddMode = () => {
        TerritoryStore.mode ='add'
    }

    render() {
        const territories = this.state.territories.map((territory, i) => {
            return <a className='collection-item' key={i}>Territory #{i}</a>
        })
        return (
            <ul className='collection with-header'>
                <li className='collection-header'>
                    <h4>Territories</h4>
                </li>
                {territories}
            </ul>
        );
    }
}
