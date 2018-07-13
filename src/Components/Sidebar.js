import React from 'react';
import {categories} from '../PlacesAPI';

const Sidebar = (props) => (
  <div id="sidebar" role="navigation">
    <div className="filter" role="menu">  
      <select aria-label="Choose a category" defaultValue="all" onChange={event => {
        props.onSidebarFilter(event.target.value)
      }}>
        <option value="all">All</option>
        {categories.map( (category,i )=> (
          <option value={category.id} key={i}>{category.name}</option>
        ))}
      </select>
    </div>  
    <ul className="places-list" role="listbox">
      {props.placeList.map( place => 
        <li key={place.id} role="button" tabIndex="0" onClick={props.sidebarPlaceClick.bind(this, place)}>{place.name}</li>
      )}
    </ul>
  </div>
)

export default Sidebar;