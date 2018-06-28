import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import * as VenuesAPI from './VenuesAPI';
 
let photo;

class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    markersAnimation: this.props.google.maps.Animation.DROP
  }

  // If marker is clicked, activate marker and display infoWindow
  onMarkerClick = (place, marker, e) => {
    let venue = place.venueId
    VenuesAPI.getPhoto(venue).then( response => {
      photo = `${response.prefix}100x100${response.suffix}`
    })

    this.setState({
      selectedPlace: place,
      activeMarker: marker,
      showingInfoWindow: true,
      markersAnimation: null
    })
    console.log(this.state.selectedPlace.position)
  }

  // Close the infoWindow and deactivate the activeMarker if clicked anywhere on the map
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  render() {

    const {markersAnimation, activeMarker, showingInfoWindow, selectedPlace} = this.state
    
    return (
      <Map 
        className="map"
        google={this.props.google} 
        onClick={this.onMapClicked}
        zoom={15}
        style={{width: '100%', height: '100%', position: 'relative' }}
        containerStyle={{ height: 'auto', position: 'relative'}}
        initialCenter={{
          lat: 42.880419,
          lng: -8.545693
        }}>
      
      {this.props.places.map( place =>
        <Marker 
          key={place.id}
          name={place.name}
          venueId={place.id}
          position={place.location}
          onClick={this.onMarkerClick}
          animation={markersAnimation}
          categories={(typeof(place.categories) !== 'undefined') ? place.categories[0] : null}
          address={(typeof(place.location.address) !== 'undefined') ? place.location.address : null}
        />
      )}
      
      <InfoWindow 
        marker={activeMarker}
        visible={showingInfoWindow}>
          <div className="info-window">
            <img style={{ width: 80, height: 80, backgroundColor: '#f9f9f9'}} src={photo} alt={selectedPlace.name}/>
            <div className="info-window-details">  
              <h4 className="info-window-title">{selectedPlace.name}</h4>
              <ul>
                {(selectedPlace.address) ? 
                  <li>{selectedPlace.address}</li>
                  : 
                  <li>There is no address available</li>
                }
                {selectedPlace.categories && (
                  <li>Category: {selectedPlace.categories.name}</li>
                )}
              </ul>
            </div>  
          </div>
      </InfoWindow>
      
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyCoJzEbxFZTym4G88j3d75luuj_xA985Xc'
})(MapContainer)