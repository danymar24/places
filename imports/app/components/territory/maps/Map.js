import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Polygon, Rectangle } from 'react-google-maps';
import DrawingManager from 'react-google-maps/lib/components/drawing/DrawingManager';
import { MapMarker } from './Marker';

export class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            center: {}, 
            markers: [],
            selectedArea: {},
            drawingMode: window.google.maps.drawing.OverlayType.POLYGON
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
                drawingMode: window.google.maps.drawing.OverlayType.RECTANGLE
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

    figureClicked = (e) => {
        console.log(e);
    }
    
    render() {
        const markers = this.state.markers.map((marker, i) => {
            return <MapMarker marker={ marker.position } key={i}/>                        
        })
        return (
            <GoogleMap
                defaultZoom={15}
                center={this.state.center} >
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
                                onOverlayComplete={this.onOverlayCompleted} />
                    { this.state.overlayType === 'polygon' && <Polygon path={this.state.selectedArea}
                            editable={true}
                            onClick={this.figureClicked} 
                            options={{
                                strokeWeight: 2,
                                fillColor:`#53b557`,
                                fillOpacity: 0.35
                            }}/> }
                    { this.state.overlayType === 'rectangle' && <Rectangle bounds={this.state.selectedArea}
                            editable={true}
                            onClick={this.figureClicked} 
                            options={{
                                strokeWeight: 2,
                                fillColor:`#53b557`,
                                fillOpacity: 0.35
                            }}/> }
                { markers }
            </GoogleMap>
        )
    }
}

const DisplayMap = withScriptjs(withGoogleMap(Map));

export { DisplayMap };