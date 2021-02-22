import React from 'react'
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '800px',
  height: '800px'
};

const center = {
    lat: 44.558755,
    lng: -89.296325
  };

const Gmap = () => {
  return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <Marker position={{lat: 44.558755, lng: -89.296325}}/>
        <InfoWindow position={{lat: 44.558755, lng: -89.296325}}><p>This Spot</p></InfoWindow>
        <></>
      </GoogleMap>
  )
}

export default Gmap
