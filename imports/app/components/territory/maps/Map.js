import React from 'react';
import { observer } from 'mobx-react';
import { Meteor } from 'meteor/meteor';

import { GoogleMap, withScriptjs, withGoogleMap, Polygon, Rectangle } from 'react-google-maps';
import DrawingManager from 'react-google-maps/lib/components/drawing/DrawingManager';
import { MapMarker } from './Marker';
import { Territory } from './Territory';
import { TerritoryStore } from '../TerritoryStore';

// Todo: Add center to created territory
// Todo: add delete territory
// Todo: add square figure
// Todo: search for the fitBounds function

@observer
export class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            center: {}, 
            markers: [],
            drawingMode: window.google.maps.drawing.OverlayType.POLYGON,
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
            TerritoryStore.setCenter(currentLocation.position);
        });
    }

    componentWillUpdate() {
        return true;
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

    onOverlayCompleted = (e) => {
        e.overlay.setMap(null);
        let area;
        if (e.type === 'polygon') {
            area = e.overlay.getPath().b;
        } else {
            area = {
                north: e.overlay.getBounds().getNorthEast().lat(),
                south: e.overlay.getBounds().getNorthEast().lng(),
                east: e.overlay.getBounds().getSouthWest().lat(),
                west: e.overlay.getBounds().getSouthWest().lng()    
            }
        }
        TerritoryStore.setSelectedTerritory({
            area,
            type: e.type
        });
        console.log('area from map', TerritoryStore.territory.area);
    }

    setEditMode = () => {
        TerritoryStore.mode = 'edit';
    }

    saveTerritory = () => {
        let area;
        if (TerritoryStore.territory.type === 'polygon') {
            area = this.ref.getPath().b.map(coord => {
                return {lat: coord.lat(), lng: coord.lng()};
            });
        } else {
            area = TerritoryStore.territory.area;
        }
        Meteor.call('territories.save', TerritoryStore.territory._id, {
            area,
            type: TerritoryStore.territory.type
        }, (err, success) => {
            if (err) {
                M.toast({html: err.reason}, 4000);
            } else {
                M.toast({html: 'Territory created.'})
            }
        });
        if (!TerritoryStore.territory._id) {
            TerritoryStore.setSelectedTerritory({});
        }
    }
    
    cancelAdd = () => {
        TerritoryStore.setSelectedTerritory({});
        TerritoryStore.mode = 'view';
    }
    
    modifiedOverlay = (e) => {
        TerritoryStore.setSelectedTerritory({
            _id: TerritoryStore.territory._id,
            area: this.ref.getPath().b,
            type: TerritoryStore.territory.type
        });
    }

    removeTerritory = (territory) => {
        Meteor.call('territories.remove', territory._id, (err, success) => {
            if (err) {
                M.toast({ html: err.reason }, 4000);
            } else {
                TerritoryStore.setSelectedTerritory({});
                TerritoryStore.mode = 'view';
                M.toast({ html: 'Territory deleted' }, 4000);
            }
        })
    }

    bindRef = ref => this.ref = ref;

    render() {
        const markers = this.state.markers.map((marker, i) => {
            return <MapMarker marker={ marker.position } key={i}/>                        
        })
        
        return (
                <GoogleMap
                    ref='map'
                    defaultZoom={15}
                    center={TerritoryStore.center} >
                    { TerritoryStore.mode === 'add' && 
                        <DrawingManager drawingMode={this.state.drawingMode}
                                        defaultOptions={{
                                            drawingControl: true,
                                            drawingControlOptions: {
                                                position: window.google.maps.ControlPosition.TOP_CENTER,
                                                drawingModes: [
                                                    window.google.maps.drawing.OverlayType.POLYGON,
                                                    // window.google.maps.drawing.OverlayType.RECTANGLE,
                                                ],
                                            }
                                        }}
                                        onOverlayComplete={this.onOverlayCompleted} />}
                        <Territory territory={{
                                        area: TerritoryStore.territory.area, 
                                        type: TerritoryStore.territory && TerritoryStore.territory.type
                                    }}
                                   mode={TerritoryStore.mode}
                                   modifiedOverlay={this.modifiedOverlay}
                                   bindRef={this.bindRef} />
                    { markers }
                    <div className='map-buttons' 
                         style={{
                                position: `absolute`,
                                top: `54px`,
                                left: `20px`
                         }} >
                        { TerritoryStore.mode !== 'edit' && TerritoryStore.territory && TerritoryStore.territory._id &&
                            <button className='btn-floating btn-large waves-effect waves-light'
                                onClick={this.setEditMode} >
                                <i className='material-icons'>edit</i>
                            </button>}
                        { (TerritoryStore.mode === 'add' || TerritoryStore.mode === 'edit') && 
                        ( <>
                            <button className='btn-floating btn-large waves-effect waves-light'
                                    onClick={this.saveTerritory} >
                                <i className='material-icons'>save</i>
                            </button> 
                            <button className='btn-floating btn-small waves-effect waves-light amber darken-2'
                                    onClick={this.cancelAdd}
                                    style={{ marginLeft: `10px` }} >
                                <i className='material-icons'>cancel</i>
                            </button>
                            { TerritoryStore.territory._id && 
                                <button className='btn-floating btn-small waves-effect waves-light red'
                                        onClick={this.removeTerritory.bind(this, TerritoryStore.territory)}
                                        style={{ marginLeft: `10px` }} >
                                    <i className='material-icons'>delete</i>
                                </button>}
                        </>)}
                    </div>
                </GoogleMap>
        )
    }
}

const DisplayMap = withScriptjs(withGoogleMap(Map));

export { DisplayMap };