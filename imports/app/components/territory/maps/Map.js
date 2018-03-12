import React from 'react';
import { observer } from 'mobx-react';
import { Meteor } from 'meteor/meteor';

import { GoogleMap, withScriptjs, withGoogleMap, Polygon } from 'react-google-maps';
import DrawingManager from 'react-google-maps/lib/components/drawing/DrawingManager';
import { Territory } from './Territory';
import { TerritoryStore } from '../TerritoryStore';

// Todo: search for the fitBounds function

@observer
export class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            center: {}, 
            drawingMode: window.google.maps.drawing.OverlayType.POLYGON,
        };
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
                drawingMode: window.google.maps.drawing.OverlayType.POLYGON
            });
            TerritoryStore.setCenter(currentLocation.position);
        });

        this.onOverlayCompleted = (e) => {
            e.overlay.setMap(null);
            TerritoryStore.setSelectedTerritory({
                geometry: {
                    coordinates: e.overlay.getPath().b,
                    type: e.type
                }
            });
            console.log('area from map', TerritoryStore.territory);
        }
    
        this.setEditMode = () => {
            TerritoryStore.mode = 'edit';
        }
    
        this.saveTerritory = () => {
            const coordinates = this.ref.getPath().b.map(coord => {
                return {lat: coord.lat(), lng: coord.lng()};
            });
    
            Meteor.call('territories.save', TerritoryStore.territory._id, {
                geometry: {
                    coordinates,
                    type: TerritoryStore.territory.type
                }
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
        
        this.cancelAdd = () => {
            TerritoryStore.setSelectedTerritory({});
            TerritoryStore.mode = 'view';
        }
        
        this.modifiedOverlay = (e) => {
            console.log(this.ref.getPath());
            TerritoryStore.setSelectedTerritory({
                _id: TerritoryStore.territory._id,
                area: this.ref.getPath().b,
                type: TerritoryStore.territory.type
            });
        }
    
        this.removeTerritory = (territory) => {
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
    
        this.bindRef = ref => this.ref = ref;
    }

    componentWillUpdate() {
        return true;
    }

    render() {
      
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
                    <Polygon path={TerritoryStore.territory &&
                                   TerritoryStore.territory.geometry && 
                                   TerritoryStore.territory.geometry.coordinates }
                            editable={TerritoryStore.mode === 'edit' || TerritoryStore.mode === 'add'}
                            ref={this.bindRef}
                            onMouseUp={this.modifiedOverlay.bind(this)}
                            options={{
                                strokeWeight: 2,
                                fillColor:`#53b557`,
                                fillOpacity: 0.35,
                            }}/>
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