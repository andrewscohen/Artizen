import {useState} from "react";
import {GoogleMap, useLoadScript, Marker, DirectionsService, DirectionsRenderer} from "@react-google-maps/api";

import Locate from './Locate';
import Search from './Search';
import Gmap from './Map';
import "@reach/combobox/styles.css";
import mapStyle from "./mapStyle";

const libraries = ["places"];

const mapContainerStyle = {
  height: "70vh",
  width: "70vw",
};
const options = {
  styles: mapStyle,
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: 30.275528863705016,
  lng: -97.74073530134736,
};
const origin = {
  lat: 30.275528863705016,
  lng: -97.74073530134736,
}
const destination = {
  lat: 39.29038,
  lng: -76.61219
}



const Directions = ({origin, destination}) => {
  const [response, setResponse] = useState(null);
  const [travelMode, setTravelMode] = useState('DRIVING');
  // const [origin, setOrigin] = useState(origin);
  // const [destination, setDestination] = useState(destination);

  const directionsCallback = (response) => {
    console.log(response)

    if (response !== null) {
      if (response.status === 'OK') {
        setResponse(response)
      } else {
        console.log('RESPONSE NOT OK: ', response)
      }
    }
  }
  return (
    <div className='map'>
      <div className='map-settings'>
        <hr className='mt-0 mb-3' />
        <div className='row'>
          <div className='col-md-6 col-lg-4'>
            <div className='form-group'>
              <br />
        {/* <button className='btn btn-primary' type='button' onClick={this.onClick}>
          Build Route
        </button> */}
      </div>

      <div className='map-container'>
        <GoogleMap
          id='direction-example'
          mapContainerStyle={{
            height: '400px',
            width: '100%'
          }}
          zoom={8}
          center={{
            lat: 0,
            lng: -180
          }}>
              <DirectionsService
                options={{
                  destination: {lat: 39.29038, lng: -76.61219},
                  origin:{lat: 39.29038, lng: -76.61219},
                  travelMode: travelMode
                }}
                callback={directionsCallback}
              />

          {
            response !== null && (
              <DirectionsRenderer
                // required
                options={{
                  directions: response
                }}
              />
            )
          }
        </GoogleMap>
      </div>
    </div>
    </div>
    </div>
    </div>
  )
}

export default Directions;
