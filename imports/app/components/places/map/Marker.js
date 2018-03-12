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

        this.markerClicked = (e) => {
            this.setState({
                isOpen: !this.state.isOpen
            });
        };

        this.addPlace = () => {
            const { marker } = this.props;
            const newPlace = {
                location:{
                    type: 'Point',
                    coordinates: [marker.position.lat(), marker.position.lng()]
                },
                address: marker.placeInfo.formatted_address,
                name: this.state.name,
            };
            console.log(newPlace);
        }
    }

    componentWillUpdate(nextProps, nextState) {
        return true;
    }


    render() {
        const marker = this.props.marker;
        console.log(marker);

        return (
            <Marker position={marker.position}
                onClick={this.markerClicked} >

                {this.state.isOpen && marker.placeInfo ? (
                    <InfoWindow>
                        <div className='marker-info'>
                            <span style={{ fontSize: `14px`, fontWeight: `bold` }}>{marker.placeInfo.name}</span> <br />
                            <span>{marker.placeInfo.formatted_address}</span> <br/>
                            <div className=''>
                                <input type='text' 
                                       placeholder='Name' 
                                       onChange={(e) => {this.setState({name: e.target.value})}} />
                            </div>
                            <span>
                                <button className='btn btn-small waves-effect waves-light right'
                                        onClick={this.addPlace}>Add</button>
                            </span>
                        </div>
                    </InfoWindow>
                ) : ''}
            </Marker>
        );
    }
}

export { MapMarker };
