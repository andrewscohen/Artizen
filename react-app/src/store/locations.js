const GET_ONE_LOCATION = "locations/GET_ONE_LOCATION";

const getOneLocation = location => {
  return {
    type: GET_ONE_LOCATION,
    payload: location,
  };
};

export const getLocation = locationId => async dispatch => {
  const res = await fetch(`/locations/${locationId}`);
  const data = await res.json();
};
