import React, { Component } from 'react';
import * as VenuesAPI from './VenuesAPI'
import Sidebar from './Sidebar'
import MapContainer from './MapContainer';
import './App.css';

class App extends Component {
  constructor(props) {
    super()
    this.state = {
      locations: [],
      filteredLocations: []
    }
  }

  componentDidMount() {
    this.menu = document.getElementById('burger-icon')
    this.sidebar = document.getElementById('sidebar')
    VenuesAPI.getAll()
      .then(response => {
        this.setState({locations: response.venues})
        console.log(this.state.locations)
      })
      .catch((error) => {
        console.error(error)
      })    
  }

  onMenuClick = () => {
    this.menu.classList.toggle("change")
    this.sidebar.classList.toggle("open")
  }

  // handleSidebarFilterChange
  sidebarFilter = (event) => {
    let filteredVenues
    if (event === "all") {
      filteredVenues = this.state.locations
    } else {
      filteredVenues = this.state.locations.filter( location => location.categories[0].id === event)
      console.log(filteredVenues)
    }
    this.setState({filteredLocations : filteredVenues})
    // Close any infoWindow open
    this.mapContainer.setState({showingInfoWindow: false})
   }
 
  render() {
    const {filteredLocations, locations} = this.state
    let places = (filteredLocations.length >= 1) ? filteredLocations : locations

    return (
      <div className="App">
        <header className="app-header">
          <div id="burger-icon" onClick={this.onMenuClick}>
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
          <h1 className="app-title">Explore Santiago</h1>
        </header>
        <main>
          <Sidebar places={places} onUpdateCategory={this.sidebarFilter}/>
          <div className="map-container">
            <MapContainer places={places} onRef={instance => this.mapContainer = instance} /> 
          </div>
        </main>
      </div>
    );
  }
}

export default App;
