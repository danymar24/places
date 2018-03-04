import React from 'react';

import { DisplayMap } from './map/Map';

export class AddPlace extends React.Component {
    render() {
        return (
            <div className='row'>
                <div className='col s3'>
                    <h4>Add place</h4>
                </div>
                <div className='col s9' 
                     style={{ height: `calc(97vh - 70px)` }}>
                    <DisplayMap googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `100%`, position: `relative` }} />}
                                mapElement={<div style={{ height: `100%`, width: `100%`, display: `inline-block` }} />} />
                </div>
            </div>
        );
    }
}