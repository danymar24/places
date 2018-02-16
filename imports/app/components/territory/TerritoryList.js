import React from 'react';
import { Tracker } from 'meteor/tracker';

import { Territories } from '../../../api/territories';
import { TerritoryStore } from './TerritoryStore';

export class TerritoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            territories: [],
            selectAllTerritories: false
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

    selectTerritory = (territory) => {
        territory.selected = !territory.selected;
        return territory;
    }

    selectAllTerritories = () => {
        this.setState({
            selectAllTerritories: !!this.state.selectAllTerritories
        });
        const territories = this.state.territories.map(territory => {
            territory.selected = this.state.selectAllTerritories; 
            return territory
        });
        this.setState({
            territories
        });
    }

    deleteSelected = () => {
        const territories = this.state.territories.filter(territory => {
            return territory.selected;
        });
        const ids = territories.map(territory => {
            return territory._id;
        });
        Meteor.call('territories.remove', ids, (err, success) => {
            if (err) {
                M.toast({ html: err.reason });
            } else {
                M.toast({ html: 'Territories deleted.'})
            }
        });
    }

    render() {
        const territories = this.state.territories.map((territory, i) => {
            return (
                <a className='collection-item' key={i}>
                    <label>
                        <input type="checkbox" 
                               className="filled-in" 
                               checked={territory.selected} 
                               onChange={() => { territory.selected = !territory.selected }} />
                        <span></span>
                    </label>
                    Territory #{i + 1}            
                </a>
            )
        })
        return (
            <ul className='collection with-header'>
                <li className='collection-header'>
                    <h4>Territories</h4>
                    <label>
                        <input type="checkbox" 
                               className="filled-in" 
                               onChange={this.selectAllTerritories} />
                        <span>Select all</span>
                    </label>
                    <label className='right'>
                        <span>Delete selected</span>
                        <button className='delete-all btn btn-small waves-effect waves-light red'
                                onClick={this.deleteSelected}>
                            <i className='material-icons'>delete</i>
                        </button>
                    </label>
                </li>
                {territories}
            </ul>
        );
    }
}
