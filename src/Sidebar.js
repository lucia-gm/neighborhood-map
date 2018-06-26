import React, { Component } from 'react';

class Sidebar extends Component {
  render() {
    return (
      <div id="sidebar">
        <div className="filter">  
          <select defaultValue="none">
            <option value="none" disabled>Select a category</option>
          </select>
        </div>  
        <ul className="places-list">
          {this.props.places.map( place => 
            <li key={place.id}>{place.name}</li>
          )}
        </ul>
      </div>

    );
  }
}

export default Sidebar;