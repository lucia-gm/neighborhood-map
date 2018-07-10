import { Component } from 'react'

class InfoWindow extends Component {

  componentWillMount = () => {
    this.infoWindow = new window.google.maps.InfoWindow({
      position: {lat: 42.880593, lng: -8.545628},
      map: this.props.map
    })

    this.infoWindow.addListener('closeclick', this.props.closeInfoWindow.bind(this, this.infoWindow))
  }

  componentWillReceiveProps = (nextProps) => {
    let content =  
    `<div class="info-window" aria-label="infowindow">
      <img src="${nextProps.markerInMapActive.photo}" alt="${nextProps.markerInMapActive.name}"/>
          <div class="info-window-details">  
            <h4 class="info-window-title">${nextProps.markerInMapActive.name}</h4>
            <ul>
                <li>${nextProps.markerInMapActive.address}</li>
                <li>Category: ${nextProps.markerInMapActive.category}</li>
            </ul>
          </div>  
    </div>`

    // Open the infoWindow of the selected place/marker
    if (nextProps.markerInMapActive !== this.props.markerInMapActive & Object.keys(nextProps.markerInMapActive).length > 0) {
      this.infoWindow.marker = nextProps.markerInMapActive
      this.infoWindow.setContent(content)
      this.infoWindow.open(nextProps.map, nextProps.markerInMapActive)
    }
  }

  

  render() {
    return null
  }

}

export default InfoWindow