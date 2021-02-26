import {useState} from "react";
import {GoogleMap, useLoadScript, DirectionsService, DirectionsRenderer} from "@react-google-maps/api";

const libraries = ["places"];

const Directions = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_PLACES_API_KEY, libraries
  }, libraries);

  const [response, setResponse] = useState(null);
  const [travelMode, setTravelMode] = useState('DRIVING');

  const directionsCallback = (response) => {
    console.log("RESPONSE: ", response)

    setTimeout(() => {
    if (response !== null) {
      if (response.status === 'OK') {
        setResponse(response)
      } else {
        console.log('RESPONSE NOT OK: ', response)
        }
      }
    }, 1000);
  }

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";



  return (
        <GoogleMap
          id='direction-example'
          mapContainerStyle={{
            height: '400px',
            width: '100%'
          }}
          zoom={2}
          center={{
            lat: 0,
            lng: -180,
          }}>
              <DirectionsService
                options={{
                  destination: "12521 Valley Pines Drive, Reisterstown, MD 21136",
                  origin: "900 Overbrook Road, Baltimore, MD 21239",
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
  )
}

export default Directions;
