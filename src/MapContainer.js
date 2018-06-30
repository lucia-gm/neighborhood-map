import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import * as VenuesAPI from './VenuesAPI';
 
let photo;

class MapContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showingInfoWindow: false,
      selectedPlaceId: this.props.selectedPlaceId,
      markersAnimation: this.props.google.maps.Animation.DROP,
      updatedProp: false
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.selectedPlaceId && !state.updatedProp) {
      const s = { ...state, selectedPlaceId: props.selectedPlaceId }
      return s
    }
    return state;
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
    let venue = place.venueId
    
    VenuesAPI.getPhoto(venue)
      .then(response => {
        let photoLink = response.items[0]
        photo = `${photoLink.prefix}100x100${photoLink.suffix}`} )
      .catch(error => console.log("Sorry! We can't get the foto details"))
      .then( response => {
        this.setState({
          showingInfoWindow: true,
          markersAnimation: null,
          selectedPlaceId: place.id
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
        showingInfoWindow: false
      })
    }
  }

  render() {
    const {markersAnimation, showingInfoWindow, selectedPlaceId } = this.state

    let markers = []
    let activeMarker = null;
    
    this.props.places.forEach(place => {
      const marker = <Marker
        id={place.id}
        key={place.id}
        name={place.name}
        venueId={place.id}
        position={place.location}
        onClick={this.onMarkerClick}
        animation={markersAnimation}
        categories={(typeof (place.categories) !== 'undefined') ? place.categories[0] : null}
        address={(typeof (place.location.address) !== 'undefined') ? place.location.address : null}
        icon={(selectedPlaceId && selectedPlaceId === place.id) ? this.markerIcon.active : this.markerIcon.default}
      />

      markers.push(marker)  

      if (selectedPlaceId && place.id === selectedPlaceId) {
        activeMarker = marker
      }
    })

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
      
      { markers }
      
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyCoJzEbxFZTym4G88j3d75luuj_xA985Xc'
})(MapContainer)