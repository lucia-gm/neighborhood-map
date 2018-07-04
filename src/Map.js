import React, { Component } from 'react';


class Map extends Component {
  state = {
    markers: [],
  }

  mapIdDOM = 'map'

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

  createMarker = () => {
    this.props.placeList.forEach(place => {
      let marker = new window.google.maps.Marker({
        map: this.map,
        position: place.location,
        name: place.name,
        animation: window.google.maps.Animation.DROP,
        id: place.id
      });

    this.state.markers.push(marker);
    });
  }

  render() {
    
    return(
      <div id={this.mapIdDOM}>
        {this.createMarker()}
      </div>
    )
  }
}

export default Map