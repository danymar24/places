import React from 'react';
import { observer } from 'mobx-react';
import { Tracker } from 'meteor/tracker';

import { Territories } from '../../../api/territories';
import { TerritoryStore } from './TerritoryStore';

@observer
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
        TerritoryStore.territory = territory;
        TerritoryStore.mode = 'view';
    }

    setAddMode = () => {
        TerritoryStore.setSelectedTerritory({});
        TerritoryStore.mode = 'add';
    }

    render() {
        const territories = this.state.territories.map((territory, i) => {
            return (
                <a href='#'
                   onClick={this.selectTerritory.bind(this, territory)}
                   className={`collection-item ${TerritoryStore.territory && TerritoryStore.territory._id === territory._id ? 'active' : ''}`} 
                   key={i}>
                    Territory #{i + 1}            
                </a>
            )
        })
        return (
            <ul className='collection with-header'>
                <li className='collection-header'>
                    <h4>Territories
                        <button className='btn-floating btn-small waves-effect waves-light right'
                            onClick={this.setAddMode} >
                            <i className='material-icons'>add</i>
                        </button>
                    </h4>
                </li>
                {territories}
            </ul>
        );
    }
}
