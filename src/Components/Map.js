import React, { Component } from 'react';
import Marker from './Marker.js';
import InfoWindow from './InfoWindow';


class Map extends Component {
  constructor(props) {
    super(props)
    this.mapIdDOM = 'map'
    this.state = {
      mapIsReady: false
    }
  }

  prepareMap = () => {
    this.map = new window.google.maps.Map(document.getElementById(this.mapIdDOM), {
      center: {lat: 42.880419, lng: -8.545693},
      zoom: 16,
      styles: [
        {
          featureType: 'poi.business',
          elementType: 'labels',
          stylers: [{visibility: 'off'}]
        },{
          featureType: 'poi.attraction',
          elementType: 'labels',
          stylers: [{visibility: 'off'}]
        },{
          featureType: 'poi.place_of_worship',
          elementType: 'labels',
          stylers: [{visibility: 'off'}]
        },{
          featureType: 'poi.park',
          elementType: 'labels',
          stylers: [{visibility: 'off'}]
        }
      ]
    });
    this.bounds = new window.google.maps.LatLngBounds()
    this.setState({ mapIsReady: true })
  }

  componentDidMount = () => {
    if (!this.state.mapIsReady) this.prepareMap()
  }

  render() {
    return(
      <div id={this.mapIdDOM} aria-label="map">
        { this.state.mapIsReady && this.props.placeList.map(place => (
          <Marker
          place={place}
          markers={this.markers}
          map={this.map}
          bounds={this.bounds}
          key={place.id}
          markerInMapList={this.props.markerInMapList}
          handleMarkerSelected={this.props.handleMarkerSelected}/>
        ))}

        {
          this.state.mapIsReady && <InfoWindow
                                map={this.map}
                                markerInMapActive={this.props.markerInMapActive}
                                closeInfoWindow={this.props.closeInfoWindow}/>
        }
      </div>
    )
  }
}

export default Map