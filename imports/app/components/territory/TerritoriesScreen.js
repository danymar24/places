import React from 'react';
import { TerritoryList } from './TerritoryList';

export class TerritoriesScreen extends React.Component {
    render() {
        return (
            <div className='row'>
                <div className='territory-list col l3'>
                    <TerritoryList />
                </div>
            </div>
        );
    }
}
