import { Component } from 'react';
import * as PlacesAPI from '../PlacesAPI';

class Marker extends Component {

  createMarkerInMap = (place) => {
    this.markerInMap = new window.google.maps.Marker({
      map: this.props.map,
      position: place.location,
      name: place.name,
      id: place.id,
      icon: {
        url: `${require("../images/default_marker.png")}`,
        scaledSize: new window.google.maps.Size(45,45)
      },
      address: (typeof(place.location.address) !== 'undefined') ? place.location.address : 'There is no address available',
      category: (typeof(place.categories) !== 'undefined') ? place.categories[0].name : null,
      photo: ''
    })

    this.props.markerInMapList.push(this.markerInMap)
    this.props.bounds.extend(this.markerInMap.position)
    this.props.map.fitBounds(this.props.bounds)
    this.markerInMap.addListener('click',this.props.handleMarkerSelected.bind(this, this.markerInMap))
  }

  componentWillMount = () => {
    this.createMarkerInMap(this.props.place)
  }

  componentDidMount = () => {
    let photo
    PlacesAPI.getPhoto(this.props.place.id)
    .then(response => {
      let photoLink = response.items[0]
      photo = `${photoLink.prefix}100x100${photoLink.suffix}`} )
    .catch(error => photo = false)
    .then(response => {
      this.markerInMap.photo = photo
    })
  }

  componentWillUnmount = () => {
    this.markerInMap.setMap(null)

    let markerInMapList = this.props.markerInMapList
    let index = markerInMapList.indexOf(this.markerInMap)

    //if this marker is on the list of markers, remove it
    if (index > -1) {
      markerInMapList.splice(index, 1);
    }
  }

  render() {
    return null 
  }
}

export default Marker