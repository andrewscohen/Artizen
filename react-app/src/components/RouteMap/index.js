import React, { useState } from "react";
import { GoogleMap, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";
import map_marker from "../images/map_marker.png";

export default function Directions({ locationsArray, mapContainerStyle, options }) {
  const [response, setResponse] = useState(null);
  const [services, setServices] = useState(true);

  const coordinates = locationsArray.map(location => {
    return { lat: location.lat, lng: location.long };
  });

  const waypoints = coordinates.slice(1, coordinates.length - 1).map(location => {
    return { location, stopover: true };
  });

  const directionsCallback = response => {
    if (response !== null) {
      if (response.status === "OK") {
        setServices(false);
        setResponse(response);
      } else {
        console.log("RESPONSE NOT OK: ", response);
      }
    }
  };

  const center = coordinates[0];

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback(map => {
    mapRef.current = map;
  }, []);

  return (
    <div className="map">
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        {services && (
          <DirectionsService
            options={{
              destination: coordinates[coordinates.length - 1],
              origin: coordinates[0],
              waypoints: waypoints,
              travelMode: "WALKING",
            }}
            callback={directionsCallback}
          />
        )}
        {response !== null && (
          <DirectionsRenderer
            // required
            options={{
              directions: response,
              markerOptions: {
                icon: {
                  url: map_marker,
                  scaledSize: new window.google.maps.Size(20, 33),
                },
              },
              polylineOptions: {
                strokeColor: "#1CC3D9",
                strokeOpacity: 0.7,
                strokeWeight: 5,
              },
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
}
