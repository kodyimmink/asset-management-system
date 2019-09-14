import React, { Component } from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class EquipmentMapContainer extends Component {

  constructor(props){
    super(props);
  
    this.state = {
      equipmentDetails: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
  }

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
      equipmentDetails: this.props.equipmentDetails
    })
  }

  render() {
    return (
      <Map
        google={this.props.google}
        onClick={this.onMapClicked}
        mapType={'satellite'}
        zoom={this.props.zoom}
        style={mapStyles}
        initialCenter={{lat: this.props.centerMap.lat, lng: this.props.centerMap.lng}}
      >
        <Marker 
          position={{lat: this.props.centerMap.lat, lng: this.props.centerMap.lng}}
          onClick={this.onMarkerClick}
          />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h6><b>{this.state.equipmentDetails.name}</b></h6>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDkTMWmNNMiiO5_q_6hhj1Wf0WzhYz4Cc8'
})(EquipmentMapContainer);