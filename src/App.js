import React, { Component } from 'react';
import Sidebar from './Sidebar'
import MapContainer from './MapContainer';
import './App.css';

class App extends Component {
  pointsOfInterest = [
    {id: 0, name:'Praza do Obradoiro', lat: 42.880593, lng: -8.545628},
    {id: 1, name: 'Mercado de Abastos', lat: 42.879840, lng: -8.541342},
    {id: 2, name: 'Parque da Alameda', lat: 42.876943, lng: -8.547609},
    {id: 3, name: 'A Maceta', lat: 42.881636, lng: -8.535520},
    {id: 4, name: 'Casa Marcelo', lat: 42.880705, lng: -8.546967},
    {id: 5, name: 'Zara', lat: 42.876240, lng: -8.544688},
    {id: 6, name: 'Follas Novas', lat: 42.875189, lng: -8.549043},
    {id: 7, name: 'Momo Pub', lat: 42.879730, lng: -8.540808},
    {id: 8, name: 'Café Tertulia', lat: 42.880351, lng: -8.549721},
    {id: 9, name: 'Hostal dos reis Católicos', lat: 42.881449, lng: -8.545879}
  ]

  state = {
    locations: this.pointsOfInterest,
  }

  onMenuClick = () => {
    const menu = document.getElementById('burger-icon')
    const sidebar = document.getElementById('sidebar')
    menu.classList.toggle("change")
    sidebar.classList.toggle("open")
  }
 
  render() {
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
          <Sidebar places={this.state.locations}/>
          <div className="map-container">
            <MapContainer places={this.state.locations}/> 
          </div>
        </main>
      </div>
    );
  }
}

export default App;
