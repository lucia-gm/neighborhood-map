import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 
class MapContainer extends Component {
  render() {
    return (
      <Map 
        google={this.props.google} 
        zoom={16}
        style={{width: '100%', height: '100%'}}
        initialCenter={{
          lat: 42.8801996,
          lng: -8.5491475
        }}>
 
        
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyCoJzEbxFZTym4G88j3d75luuj_xA985Xc'
})(MapContainer)