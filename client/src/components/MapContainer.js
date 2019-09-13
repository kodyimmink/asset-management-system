import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {

  render() {
    return (
      <Map
        google={this.props.google}
        mapType={'satellite'}
        zoom={20}
        style={mapStyles}
        initialCenter={{lat: this.props.lat, lng: this.props.lng}}
      >
        <Marker
            name={this.props.name}
            position={{lat: this.props.lat, lng: this.props.lng}} />
        <Marker />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCBjByh38WSNE5CA9NIo4uLexX-mThg-LA'
})(MapContainer);