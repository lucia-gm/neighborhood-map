import React, { Component } from 'react';
import Map from './Map';
import Sidebar from './Sidebar';
import * as PlacesAPI from './PlacesAPI';
import './App.css';

class App extends Component {
  constructor(props) {
    super()
    this.state = {
      placeList: [], 
      placeListFiltered: [],
      markerInMapList: []
    }
  }

  componentDidMount = () => {
    this.menu = document.getElementById('burger-icon')
    this.sidebar = document.getElementById('sidebar')

    PlacesAPI.getAll()
    .then( response => {
      this.setState({placeList: response.venues})
      console.log(this.state.placeList)
    })
    .catch(error => console.error(error))
  }

  onMenuClick = () => {
    this.menu.classList.toggle("open")
    this.sidebar.classList.toggle("open")
  }

  handleSidebarFilter = (value) => {
    let placesFiltered
    if (value === "all") {
      placesFiltered = this.state.placeList
    } else {
      placesFiltered = this.state.placeList.filter( place => place.categories[0].id === value)
    }
    this.setState({ 
      placeListFiltered: placesFiltered,
    })
  }

  handleSidebarPlaceClick = (place) => {
    const marker = this.state.markerInMapList.filter(marker => marker.id === place.id)
    this.handleMarkerSelected(marker[0])
  }

  handleMarkerSelected = (marker) => {
    marker.setAnimation(window.google.maps.Animation.BOUNCE)
    marker.setIcon({
      url: `${require("./icons/active_marker.png")}`,
      scaledSize: new window.google.maps.Size(45,45)
    })
  }


 
  render() {
    const {placeList, placeListFiltered, markerInMapList} = this.state
    let places = (placeListFiltered.length >= 1) ? placeListFiltered : placeList

    return (
      <div className="App">
        <header className="app-header">
          <div id="burger-icon" onClick={this.onMenuClick}>
            <div className="burger-icon-bar1"></div>
            <div className="burger-icon-bar2"></div>
            <div className="burger-icon-bar3"></div>
          </div>
          <h1 className="app-title">Explore Santiago</h1>
        </header>
        <main>
          <Sidebar placeList={places} onSidebarFilter={this.handleSidebarFilter} sidebarPlaceClick={this.handleSidebarPlaceClick}/> 
          <Map placeList={places} markerInMapList={markerInMapList} markerSelected={this.handleMarkerSelected}/> 
        </main>
      </div>
    );
  }
}

export default App;
