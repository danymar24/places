import React from 'react';
import { Polygon, Rectangle } from 'react-google-maps';

export class Territory extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const { territory, mode, modifiedOverlay, bindRef } = this.props;
        return (
            <>
                { territory && territory.type === 'polygon' && 
                    <Polygon path={territory.area}
                             editable={mode === 'edit' || mode === 'add'}
                             ref={bindRef}
                             onMouseUp={modifiedOverlay.bind(this)}
                             options={{
                                 strokeWeight: 2,
                                 fillColor:`#53b557`,
                                 fillOpacity: 0.35,
                             }}/> }
                { territory && territory.type === 'rectangle' && 
                    <Rectangle bounds={territory.area}
                               editable={mode === 'edit' || mode === 'add'}
                               onMouseUp={modifiedOverlay.bind(this)}
                               options={{
                                   strokeWeight: 2,
                                   fillColor:`#53b557`,
                                   fillOpacity: 0.35,
                               }}/> }
            </>
        );
    }
}
