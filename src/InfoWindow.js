import { Component } from 'react'

class InfoWindow extends Component {

  componentWillMount = () => {
    this.infoWindow = new window.google.maps.InfoWindow({
      position: {lat: 42.880593, lng: -8.545628},
      map: this.props.map
    })
  }

  componentWillReceiveProps = (nextProps) => {
    let content =  
    `<div class="info-window">
      <img style="width: 80px; height: 80px; background-color: #f9f9f9" src="${nextProps.markerInMapActive.photo}" alt="${nextProps.markerInMapActive.name}"/>
          <div class="info-window-details">  
            <h4 class="info-window-title">${nextProps.markerInMapActive.name}</h4>
            <ul>
                <li>${nextProps.markerInMapActive.address}</li>
                <li>Category: ${nextProps.markerInMapActive.category}</li>
            </ul>
          </div>  
    </div>`

    if (nextProps.markerInMapActive !== this.props.markerInMapActive) {
      this.infoWindow.marker = nextProps.markerInMapActive
      this.infoWindow.setContent(content)
      this.infoWindow.open(nextProps.map, nextProps.markerInMapActive)
    }
  }

  

  render() {
    console.log('infoWindow', this.infoWindow)
    return null
  }

}

export default InfoWindow