import React from 'react';
import { Polygon, Rectangle } from 'react-google-maps';
import { TerritoryStore } from '../TerritoryStore';

export class Territory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            territory: {}
        }
    }

    componentWillReceiveProps(props) {
        console.log('props', props);
        if (props.territory && props.territory.type && props.territory.type !== 'polygon') {
            const area = props.territory.area;
            this.setState({
                territory: area
            });
            console.log('state', this.state);
        }
    }

    componentWillUpdate() {
        return true;
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
