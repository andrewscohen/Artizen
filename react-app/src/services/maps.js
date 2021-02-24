import { getGeocode, getLatLng } from "use-places-autocomplete";

export const convertAddressToCoords = async (address) => {
  const results = await getGeocode({ address });
  const { lat, lng } = await getLatLng(results[0]);
  return {lat, lng}
};
