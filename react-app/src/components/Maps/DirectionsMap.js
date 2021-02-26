// import {useState} from "react";
// import {GoogleMap, useLoadScript, Marker, DirectionsService, DirectionsRenderer} from "@react-google-maps/api";

// import Locate from './Locate';
// import Search from './Search';
// import "@reach/combobox/styles.css";
// import mapStyle from "./mapStyle";
// const libraries = ["places"];

// const mapContainerStyle = {
//   height: "70vh",
//   width: "70vw",
// };
// const options = {
//   styles: mapStyle,
//   disableDefaultUI: true,
//   zoomControl: true,
// };
// const center = {
//   lat: 30.275528863705016,
//   lng: -97.74073530134736,
// };



// const DirectionsMap = () => {
//   const [directions, setDirections] = useState(null);
//   const [error, setError] = useState();

//   const directionsService = new window.google.maps.DirectionsService();
//       directionsService.route(
//         {
//           origin: 'Chicago, IL',
//           destination: 'Los Angeles, CA',
//           waypoints: [
//             {
//               location: 'Joplin, MO',
//               stopover: false
//             },{
//               location: 'Oklahoma City, OK',
//               stopover: true
//             }],
//           travelMode: 'DRIVING'
//         },
//         (result, status) => {
//           console.log(result)
//           if (status === window.google.maps.DirectionsStatus.OK) {
//             setDirections(result);
//           } else {
//             setError(result);
//           }
//         }
//       );
//         if (error) {
//       return <h1>{error}</h1>;
//     }
//     return (
//       directions && (
//         <DirectionsRenderer directions={directions} />
//       )
//     );
// }

// const RenderMap = () => {
//   return (
//     <>
//   <GoogleMap>
// <DirectionsMap />
//   </GoogleMap>
//   </>
//   )
// }

// export default RenderMap;

// // export default DirectionsMap;

// // const Map = withScriptjs(
// //   withGoogleMap(props => (
// //     <GoogleMap
// //       defaultCenter={props.defaultCenter}
// //       defaultZoom={props.defaultZoom}
// //     >
// //       {props.markers.map((marker, index) => {
// //         const position = { lat: marker.latitude, lng: marker.longitude };
// //         return <Marker key={index} position={position} />;
// //       })}
// //       <MapDirectionsRenderer
// //         places={props.markers}
// //         travelMode={google.maps.TravelMode.DRIVING}
// //       />
// //     </GoogleMap>
// //   ))
// // );

import {useState} from react;
import {DirectionsService} from "@react-google-maps/api";

const Directions = ({origin, destination}) => {
  const [response, setResponse] = useState(null);
  const [travelMode, setTravelMode] = useState('DRIVING');
  const [origin, setOrigin] = useState(origin);
  const [destination, setDestination] = useState(destination);

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


}
