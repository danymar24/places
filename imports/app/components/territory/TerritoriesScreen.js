import React from 'react';

import { TerritoryList } from './TerritoryList';
import { DisplayMap } from './maps/Map';

export class TerritoriesScreen extends React.Component {
    render() {
        return (
            <div className='row'>
                <div className='territory-list col l3'>
                    <TerritoryList />
                </div>
                <div className='col s9'>
                    <DisplayMap googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
                         loadingElement={<div style={{ height: `100vh` }} />}
                         containerElement={<div style={{ height: `100vh` }} />}
                         mapElement={<div style={{ height: `100vh`, width: `100%`, display: `inline-block` }} />} />
                </div>
            </div>
        );
    }
}
