import React from 'react';
import { Marker, InfoWindow } from 'react-google-maps';

class MapMarker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    componentWillMount() {
        this.setState({
            isOpen: this.props.openInfo || false
        });
          
        this.markerClicked = () => {
            this.setState({
                isOpen: !this.state.isOpen
            });
        };
    }


    render() {
        const marker = this.props.marker;

        return (
            <Marker position={marker.position} >
            </Marker>
        );
    }
}

export { MapMarker };