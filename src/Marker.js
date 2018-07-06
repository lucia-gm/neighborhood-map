import { Component } from 'react';

class Marker extends Component {
  createMarkerInMap = (place) => {
    this.markerInMap = new window.google.maps.Marker({
      map: this.props.map,
      position: place.location,
      name: place.name,
      icon: {
        url: `${require("./icons/default_marker.png")}`,
        scaledSize: new window.google.maps.Size(45,45)
      },
      id: place.id
      // animation: window.google.maps.Animation.DROP
    })

    this.props.markerInMapList.push(this.markerInMap)
    this.markerInMap.addListener('click',this.props.markerSelected.bind(this, this.markerInMap))
  }

  componentWillMount = () => {
      this.createMarkerInMap(this.props.place)
  }

  componentWillUnmount = () => {
    this.markerInMap.setMap(null)

    let markerInMapList = this.props.markerInMapList
    let index = markerInMapList.indexOf(this.markerInMap)

    //if this marker is on the list of markers, remove it
    if (index > -1) {
      markerInMapList.splice(index, 1);
    }
    console.log('index', index)
  }

  render() {
    console.log('markers',this.props.markerInMapList)
    return null 
  }
}

export default Marker