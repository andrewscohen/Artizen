import React from 'react'
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '800px',
  height: '800px'
};

const center = {
    lat: 30.275528863705016,
    lng:  -97.74073530134736
  };

const Gmap = () => {
  return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <Marker position={{lat: 30.275528863705016, lng: -97.74073530134736}}/>
        {/* <InfoWindow position={{lat: 30.275528863705016, lng: -97.74073530134736}}><p>This Spot</p></InfoWindow> */}
        <></>
      </GoogleMap>
  )
}

export default Gmap
