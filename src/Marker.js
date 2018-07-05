import { Component } from 'react';

class Marker extends Component {
  createMarkerInMap = (place) => {
    this.markerInMap = new window.google.maps.Marker({
      map: this.props.map,
      position: place.location,
      name: place.name,
      // animation: window.google.maps.Animation.DROP
    }
  );

    this.props.markers.push(this.markerInMap)
  }

  componentWillMount = () => {
      this.createMarkerInMap(this.props.place)
      console.log('created', this.markerInMap)
  }

  componentWillUnmount = () => {
    this.markerInMap.setMap(null)
    console.log('removed', this.markerInMap)
  }

  render() {
    return null 
  }
}

export default Marker