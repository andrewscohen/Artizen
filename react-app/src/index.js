import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {LoadScript} from '@react-google-maps/api';


ReactDOM.render(
  <React.StrictMode>
    <LoadScript googleMapsApiKey='AIzaSyAe1sYNIYtSueIWvyDDK8stzK7oVfgQuWU'>
      <App />
    </LoadScript>
  </React.StrictMode>,
  document.getElementById('root')
);
