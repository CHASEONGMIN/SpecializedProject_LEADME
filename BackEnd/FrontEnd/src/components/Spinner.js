
//Spinner.js
import React from 'react';
import './Spinner.css'
const Spinner = (props) => {
 return(
  <div class="loading-container">
    <div class="loading"></div>
    <div id="loading-text">loading</div>
  </div>
 );
}
export default Spinner;