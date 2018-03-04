import React from 'react';
import { observer } from 'mobx-react';
import { Meteor } from 'meteor/meteor';
import _ from 'lodash';

import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';

import { MapMarker } from './Marker';

// Todo: Fix markers

export class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            center: {}, 
            markers: [],
        }
    }

    componentWillMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = Number(position.coords.latitude);
            const lng = Number(position.coords.longitude);
            const currentLocation = {
                position: { lat, lng }
            };

            this.setState({
                center: currentLocation.position,
                markers: [currentLocation]
            });
        });

        this.onBoundsChanged = () => {
            this.setState({
                bounds: this.refs.map.getBounds(),
                center: this.refs.map.getCenter(),
            });
        };
    
        this.onPlacesChanged = () => {
            const places = this.refs.searchBox.getPlaces();
            const bounds = new window.google.maps.LatLngBounds();
            places.forEach(place => {
                if (place.geometry.viewport) {
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
    
            const nextMarkers = places.map(place => ({
                placeInfo: place,
                position: place.geometry.location,
                open: false
            }));
    
            const nextCenter = _.get(nextMarkers, '0.position', this.state.center);
            this.setState({
                center: nextCenter,
                markers: nextMarkers,
            });
        };
    
        this.locationClicked = (e) => {
            this.setState({
                markers: [{ lat: e.latLng.lat(), lng: e.latLng.lng() }]
            });
        }
    
    }

    componentWillUpdate() {
        return true;
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

    render() {
        const markers = this.state.markers.map((marker, i) => {
            return <MapMarker marker={ marker } key={i}/>                        
        });
        
        return (
                <GoogleMap
                    ref='map'
                    defaultZoom={15}
                    center={this.state.center} >
                    <SearchBox ref='searchBox'
                               bounds={this.state.bounds}
                               controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
                               onPlacesChanged={this.onPlacesChanged} >
                        <input type="text"
                            placeholder="Search place"
                            style={{
                                boxSizing: `border-box`,
                                border: `1px solid transparent`,
                                width: `240px`,
                                height: `32px`,
                                marginTop: `10px`,
                                padding: `0 12px`,
                                borderRadius: `3px`,
                                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                                fontSize: `14px`,
                                outline: `none`,
                                textOverflow: `ellipses`,
                                backgroundColor: 'white'
                            }} />
                    </SearchBox>
                    { markers }
                </GoogleMap>
        )
    }
}

const DisplayMap = withScriptjs(withGoogleMap(Map));

export { DisplayMap };