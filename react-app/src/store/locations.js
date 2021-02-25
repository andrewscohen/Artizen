const GET_ONE_LOCATION = "locations/GET_ONE_LOCATION";

const getOneLocation = location => {
  return {
    type: GET_ONE_LOCATION,
    payload: location,
  };
};

export const getLocation = locationId => async dispatch => {
  const res = await fetch(`/api/locations/${locationId}`);
  const data = await res.json();

  console.log(data);
  dispatch(getOneLocation(data));
};

const initialState = {};

const locationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ONE_LOCATION:
      return action.payload;
    default:
      return state;
  }
};

export default locationsReducer;
