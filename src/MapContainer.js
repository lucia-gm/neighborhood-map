import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 
class MapContainer extends Component {
  render() {
    return (
      <Map 
        google={this.props.google} 
        zoom={15}
        style={{width: '100vw', height: '100vh'}}
        initialCenter={{
          lat: 42.8801996,
          lng: -8.5491475
        }}>
      
      {this.props.places.map( place => 
        <Marker 
          key = {place.id}
          name = {place.name}
          position = {{lat: place.lat, lng: place.lng}}
          />
      )}
        
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyCoJzEbxFZTym4G88j3d75luuj_xA985Xc'
})(MapContainer)