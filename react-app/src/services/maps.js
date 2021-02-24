import Geocode from "react-geocode";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_PLACES_API_KEY);
Geocode.setLocationType("ROOFTOP");

export const getCoords = (address) => Geocode.fromAddress(address).then(
  (response) => {
    const { lat, lng } = response.results[0].geometry.location;
    return(lat, lng);
  },
  (error) => {
    console.error(error);
  }
);
