import Geocode from "react-geocode";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_PLACES_API_KEY);
Geocode.setLocationType("ROOFTOP");

export const getCoords = (address) => Geocode.fromAddress(address).then(
  (response) => {
    const { lat, lng } = response.results[0].geometry.location;
    console.log({lat, long: lng})
    // return(lat, lng);
    return ({lat, long: lng}) ;
  },
  (error) => {
    console.error(error);
  }
);
