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

        this.markerDragged = (e) => {
            const markerPosition = {
                location: {
                    lat: e.latLng.lat(), lng: e.latLng.lng()
                }
            };
        };

        this.markerClicked = (e) => {
            console.log(e);
            this.setState({
                isOpen: !this.state.isOpen
            });
        };
    }

    componentWillUpdate(nextProps, nextState) {
        return true;
    }

    render() {
        const marker = this.props.marker;

        return (
            <Marker position={marker.position}
                draggable={!this.props.isDisplay}
                onDragEnd={this.markerDragged}
                onClick={this.markerClicked} >

                {this.state.isOpen && marker.placeInfo ? (
                    <InfoWindow>
                        <div>
                            <span style={{ fontSize: `14px`, fontWeight: `bold` }}>{marker.placeInfo.name}</span> <br />
                            <span>{marker.placeInfo.formatted_address}</span> <br />
                            <span>
                                <a href={`https://maps.google.com/?daddr=${marker.position.lat}, ${marker.position.lng}`}
                                    target='__blank'>
                                    Get directions
                                </a>
                            </span>
                        </div>
                    </InfoWindow>
                ) : ''}
            </Marker>
        );
    }
}

export { MapMarker };
