import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
 
class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  }

  // If marker is clicked, activate marker and display infoWindow
  onMarkerClick = (place, marker, e) => {
    this.setState({
      selectedPlace: place,
      activeMarker: marker,
      showingInfoWindow: true
    })
  }

  // Close the infoWindow and deactivate the activeMarker if clicked anywhere on the map
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {
    return (
      <Map 
        className="map"
        google={this.props.google} 
        onClick={this.onMapClicked}
        zoom={15}
        style={{width: '100%', height: '100%', position: 'relative' }}
        containerStyle={{ height: 'auto', position: 'relative'}}
        initialCenter={{
          lat: 42.8801996,
          lng: -8.5491475
        }}>
      
      {this.props.places.map( place => 
        <Marker 
          key={place.id}
          name={place.name}
          position={{lat: place.lat, lng: place.lng}}
          onClick={this.onMarkerClick}
          animation={this.props.google.maps.Animation.DROP}
        />
      )}
      
      <InfoWindow 
        marker={this.state.activeMarker}
        visible={this.state.showingInfoWindow}>
          <div> This is an InfoWindow</div>
      </InfoWindow>
      
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyCoJzEbxFZTym4G88j3d75luuj_xA985Xc'
})(MapContainer)