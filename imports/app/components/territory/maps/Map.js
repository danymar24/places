import React from 'react';
import { Meteor } from 'meteor/meteor';

import { GoogleMap, withScriptjs, withGoogleMap, Polygon, Rectangle } from 'react-google-maps';
import DrawingManager from 'react-google-maps/lib/components/drawing/DrawingManager';
import { MapMarker } from './Marker';
import { Territory } from './Territory';
import { TerritoryStore } from '../TerritoryStore';

export class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            center: {}, 
            markers: [],
            selectedArea: {},
            drawingMode: window.google.maps.drawing.OverlayType.POLYGON,
            selectedArea: [],
            overlayType: '',
            mode: ''
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
                markers: [currentLocation],
                drawingMode: window.google.maps.drawing.OverlayType.POLYGON
            });
        });
    }

    onOverlayCompleted = (e) => {
        this.setState({
            drawingMode: null,
            selectedArea: e.type === 'polygon' ? e.overlay.getPath().b : e.overlay.getBounds(),
            overlayType: e.type
        });
        e.overlay.setMap(null);
    }

    setAddMode = () => {
        this.setState({
            mode: 'add'
        })
    }

    saveTerritory = () => {
        let area;
        if (this.state.overlayType === 'polygon') {
            area = this.ref.getPath().b.map(coord => {
                return {lat: coord.lat(), lng: coord.lng()};
            });
        } else {
            area = this.state.selectedArea;
        }
        Meteor.call('territories.insert', {
            area,
            type: this.state.overlayType
        }, (err, success) => {
            if (err) {
                M.toast({html: err.reason}, 4000);
            } else {
                M.toast({html: 'Territory created.'})
            }
        });
        this.setState({
            selectedArea: [],
            overlayType: []
        })
    }
    
    cancelAdd = () => {
        this.setState({
            selectedArea: [],
            overlayType: '',
            mode: 'view'
        })
    }
    
    modifiedOverlay = (e) => {
        this.setState({
            selectedArea: this.ref.getPath().b
        });
    }

    bindRef = ref => this.ref = ref;

    render() {
        const markers = this.state.markers.map((marker, i) => {
            return <MapMarker marker={ marker.position } key={i}/>                        
        })
        
        return (
                <GoogleMap
                    defaultZoom={15}
                    center={this.state.center} >
                    { this.state.mode === 'add' && 
                        <DrawingManager drawingMode={this.state.drawingMode}
                                        defaultOptions={{
                                            drawingControl: true,
                                            drawingControlOptions: {
                                                position: window.google.maps.ControlPosition.TOP_CENTER,
                                                drawingModes: [
                                                    window.google.maps.drawing.OverlayType.POLYGON,
                                                    window.google.maps.drawing.OverlayType.RECTANGLE,
                                                ],
                                            }
                                        }}
                                        onOverlayComplete={this.onOverlayCompleted} />}
                        <Territory territory={{area: this.state.selectedArea, type: this.state.overlayType}}
                                   mode={this.state.mode}
                                   modifiedOverlay={this.modifiedOverlay}
                                   bindRef={this.bindRef} />
                    { markers }
                    <div className='map-buttons' 
                         style={{
                                position: `absolute`,
                                top: `54px`,
                                left: `20px`
                         }} >
                        { this.state.mode !== 'add' && <button className='btn-floating btn-large waves-effect waves-light'
                                onClick={this.setAddMode} >
                            <i className='material-icons'>add</i>
                        </button>}
                        { this.state.mode === 'add' && ( <>
                            <button className='btn-floating btn-large waves-effect waves-light'
                                    onClick={this.saveTerritory} >
                                <i className='material-icons'>save</i>
                            </button> 
                            <button className='btn-floating btn-small waves-effect waves-light red'
                                    onClick={this.cancelAdd}
                                    style={{ marginLeft: `10px` }} >
                                <i className='material-icons'>delete</i>
                            </button>
                        </>)}
                    </div>
                </GoogleMap>
        )
    }
}

const DisplayMap = withScriptjs(withGoogleMap(Map));

export { DisplayMap };