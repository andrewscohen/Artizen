import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import {LoadScript} from '@react-google-maps/api';


ReactDOM.render(
  <React.StrictMode>
    {/* <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_PLACES_API_KEY}> */}
      <App />
    {/* </LoadScript> */}
  </React.StrictMode>,
  document.getElementById('root')
);
