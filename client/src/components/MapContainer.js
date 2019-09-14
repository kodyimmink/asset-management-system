import React, { Component } from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';

const GMAPS_KEY = process.env.REACT_APP_GMAPS_KEY;

export class MapContainer extends Component {

  constructor(props){
    super(props);
  
    this.state = {
      siteGps: {
        lat: '',
        lng: ''
      },
      equipmentList: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }

    this.generateMarkers = this.generateMarkers.bind(this);
  }

  generateMarkers(){
    return this.state.equipmentList.map( currentEquipment => {
        return <Marker 
          key={currentEquipment._id}
          onClick={this.onMarkerClick}
          name={currentEquipment.name}
          position={{lat: currentEquipment.gpsLat, lng: currentEquipment.gpsLng}}/>
      })
  };

  onMarkerClick = (props, marker, e) =>
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true
  });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  componentDidMount(){
    this.setState({
      siteGps: this.props.siteGps,
      equipmentList: this.props.equipmentList
    })
  };

  render() {
    return (
      <div id="map-container-google-11" className="z-depth-1-half map-container-6" style={{height: '600px'}}>
      <Map
        google={this.props.google}
        onClick={this.onMapClicked}
        mapType={'satellite'}
        zoom={this.props.zoom}
        style={{width: '100%', height: '600px', position: 'relative !important'}}
        initialCenter={{lat: this.props.siteGps.lat, lng: this.props.siteGps.lng}}
      >
        { this.state.equipmentList.length !== 0 ? this.generateMarkers() : '' }
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h6><b>{this.state.selectedPlace.name}</b></h6>
            </div>
        </InfoWindow>
      </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: GMAPS_KEY
})(MapContainer);