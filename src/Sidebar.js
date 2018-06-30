import React, { Component } from 'react';
import {categories} from './VenuesAPI';

class Sidebar extends Component {
  state = {
    selectedPlace: {}
  }
  
  render() {
    return (
      <div id="sidebar">
        <div className="filter">  
          <select defaultValue="all" onChange={event => {
            this.props.onUpdateCategory(event.target.value)
          }}>
            <option value="all">All</option>
            {categories.map( (category,i )=> (
              <option value={Object.values(category)} key={i}>{Object.keys(category)}</option>
            ))}
          </select>
        </div>  
        <ul className="places-list">
          {this.props.places.map( place => 
            <li key={place.id} onClick={this.props.handleSidebarPlaceClick.bind(this, place)}>{place.name}</li>
          )}
        </ul>
      </div>

    );
  }
}

export default Sidebar;