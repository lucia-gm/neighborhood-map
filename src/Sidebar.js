import React, { Component } from 'react';
import {categories} from './PlacesAPI';

class Sidebar extends Component {
  render() {
    return (
      <div id="sidebar">
        <div className="filter">  
          <select defaultValue="all" onChange={event => {
            this.props.onSidebarFilter(event.target.value)
          }}>
            <option value="all">All</option>
            {categories.map( (category,i )=> (
              <option value={category.id} key={i}>{category.name}</option>
            ))}
          </select>
        </div>  
        <ul className="places-list">
          {this.props.placeList.map( place => 
            <li key={place.id} onClick={this.props.sidebarPlaceClick.bind(this, place)}>{place.name}</li>
          )}
        </ul>
      </div>

    );
  }
}

export default Sidebar;