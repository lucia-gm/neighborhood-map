import React, { Component } from 'react';
import Marker from './Marker.js'


class Map extends Component {
  constructor(props) {
    super(props)
    
    this.mapIdDOM = 'map'
  }

  componentDidMount() {
    try {
      this.map = new window.google.maps.Map(document.getElementById(this.mapIdDOM), {
        center: {lat: 42.880419, lng: -8.545693},
        zoom: 16
      });
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    return(
      <div id={this.mapIdDOM}>
        {this.props.placeList.map(place => (
          <Marker 
          place={place} 
          markers={this.markers} 
          map={this.map} 
          key={place.id} 
          markerInMapList={this.props.markerInMapList} 
          markerSelected={this.props.markerSelected}/>
        ))}
      </div>
    )
  }
}

export default Map