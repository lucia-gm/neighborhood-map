import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import * as VenuesAPI from './VenuesAPI';
 
let photo;

class MapContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      markersAnimation: this.props.google.maps.Animation.DROP
    }

    this.props.onRef(this)
  }

  markerIcon = {
    default: {
      url: `${require("./icons/default_marker.png")}`,
      scaledSize: new window.google.maps.Size(45,45)
    },
    active: {
      url: `${require("./icons/active_marker.png")}`,
      scaledSize: new window.google.maps.Size(45,45)
    }
  }

  // Activate marker and display infoWindow with photo
  showActivePlace = (place, marker) => {
    let venue = place.id

    VenuesAPI.getPhoto(venue)
      .then(response => {
        let photoLink = response.items[0]
        photo = `${photoLink.prefix}100x100${photoLink.suffix}`} )
      .catch(error => console.log("Sorry! We can't get the foto details"))
      .then( response => {
        this.setState({
          selectedPlace: place,
          activeMarker: marker,
          showingInfoWindow: true,
          markersAnimation: null
        })
    })
  }

  // If marker is clicked, show active place
  onMarkerClick = (place, marker, e) => {
    this.showActivePlace(place, marker)
  }

  // Close the infoWindow and deactivate the activeMarker if clicked anywhere on the map or the close icon
  onCloseInfoWindow = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: {}
      })
    }
  }

  render() {
    
    const {markersAnimation, activeMarker, showingInfoWindow, selectedPlace} = this.state

    return (
      <Map 
        className="map"
        google={this.props.google} 
        onClick={this.onCloseInfoWindow}
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
          id={place.id}
          position={place.location}
          onClick={this.onMarkerClick}
          animation={markersAnimation}
          categories={(typeof(place.categories) !== 'undefined') ? place.categories[0] : null}
          address={(typeof(place.location.address) !== 'undefined') ? place.location.address : null}
          icon= {(place.id === activeMarker.id) ? this.markerIcon.active : this.markerIcon.default}
        />
      )}
      
      <InfoWindow 
        marker={activeMarker}
        visible={showingInfoWindow}
        onClose={this.onCloseInfoWindow}>
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