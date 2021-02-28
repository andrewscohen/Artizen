import React, {useState} from "react";
import {GoogleMap, DirectionsService, DirectionsRenderer} from "@react-google-maps/api";

const Directions = () => {
  const [response, setResponse] = useState(null);
  const [services, setServices] = useState(true)


  const directionsCallback = (response) => {
    console.log("RESPONSE: ", response)

    if (response !== null) {
      if (response.status === 'OK') {
        setServices(false)
        setResponse(response)
      } else {
        console.log('RESPONSE NOT OK: ', response)
        }
      }
  }

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  return (
        <GoogleMap
          id='direction-example'
          mapContainerStyle={{
            height: '400px',
            width: '100%'
          }}
          zoom={8}
          center={{
            lat: 39.37,
            lng: -76.59,
          }}
          onLoad={onMapLoad}
        >
          { services &&
              <DirectionsService
                options={{
                  destination: "12521 Valley Pines Drive, Reisterstown, MD 21136",
                  origin: "900 Overbrook Road, Baltimore, MD 21239",
                  travelMode: "DRIVING"
                }}
                callback={directionsCallback}
              />
}
          {
            response !== null && (
              <DirectionsRenderer
                options={{
                  directions: response
                }}
              />
            )
          }
        </GoogleMap>
  )
}

export default Directions;
