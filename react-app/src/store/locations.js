const GET_ONE_LOCATION = "locations/GET_ONE_LOCATION";
const GET_EVERY_LOCATION = "locations/GET_EVERY_LOCATION";
const UPDATE_LOCATION = "locations/UPDATE_LOCATION";
const NEW_LOCATION = "locations/NEW_LOCATION";
const RESET_NEW_LOCATION = "locations/RESET_NEW_LOCATION"
const GET_EVERY_USER_LOCATION = "locations/GET_EVERY_USER_LOCATION";
const DELETE_LOCATION = "locations/DELETE_LOCATION";
const USER_LOGOUT = "USER_LOGOUT";

const getOneLocation = location => {
  return {
    type: GET_ONE_LOCATION,
    payload: location,
  };
};

const getEveryLocation = (locations) => {
    return { type: GET_EVERY_LOCATION, locations }
}

const getEveryUserLocation = (locations) => {
  return { type: GET_EVERY_USER_LOCATION, locations}
}

const deleteLocation = (id) => {
  return { type: DELETE_LOCATION, id}
}

const newLocation = (location) => {
    return {
        type: NEW_LOCATION,
        payload: location,
    }
}

export const resetNewLocation = () => {
  return { type: RESET_NEW_LOCATION }
}

const updateOneLocation = location => {
  return {
    type: UPDATE_LOCATION,
    payload: location,
  };
};

export const getLocation = locationId => async dispatch => {
    const res = await fetch(`/api/locations/get/${locationId}`);
    const data = await res.json();

    dispatch(getOneLocation(data));
    return data;
  };

export const getAllLocations = () => async dispatch => {
    const res = await fetch(`/api/locations/get/all`);
    const data = await res.json();

    dispatch(getEveryLocation(data));
}

export const getUserLocations = (userId) => async dispatch => {
  const res = await fetch(`/api/users/${userId}/locations`)
  const data = await res.json();
  dispatch(getEveryUserLocation(data));
  return data;
}

export const deleteOneLocation = (id) => async dispatch => {
  const res = await fetch(`/api/locations/delete/${id}`, {
    method: "DELETE"
  });
  if (res.ok) {
    dispatch(deleteLocation(id));
    return res;
  }
}

export const addLocation = (locationFile) => async (dispatch) => {
    const {
        user_id,
        title,
        artist,
        street_address,
        city,
        state,
        zip_code,
        description,
        lat,
        long,
        photo
        } = locationFile

    const res = await fetch('/api/locations/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user_id,
            title,
            artist,
            street_address,
            city,
            state,
            zip_code,
            description,
            lat,
            long,
            })
    })
    let result = await res.json()


    const form = new FormData()
    form.append('photo', photo)
    form.append('user_id', result.user_id)
    form.append('location_id', result.id)

    const photoRes = await fetch('/api/photos/', {
        method: "POST",
        body: form
    })

    let p_result = await photoRes.json()
    console.log(p_result)
    if (res.ok && photoRes.ok){
            result['photos'].push(p_result.url)
            dispatch(newLocation(result))
        }
    }

export const updateLocation = locationObj => async dispatch => {
  const { id, user_id, title, artist, street_address, city, state, zip_code, description, lat, long } = locationObj;

  const res = await fetch(`/api/locations/${id}/edit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id,
      title,
      artist,
      street_address,
      city,
      state,
      zip_code,
      description,
      lat,
      long,
    }),
  });

  const data = await res.json();
  dispatch(updateOneLocation(data));
};


const initialState = {location: null, newLocation: null, allLocations: {}, userLocations: {}}

const locationsReducer = (state = initialState, action) => {
    let newState;
    const updateState = {...state}
    switch (action.type) {
        case NEW_LOCATION:
            newState = Object.assign({}, state)
            // { [location.id] : location }
            newState.newLocation = action.payload
            return newState
        case RESET_NEW_LOCATION:
            updateState.newLocation = null;
            return updateState;
        case GET_ONE_LOCATION:
            newState = Object.assign({}, state)
            newState.location = action.payload
            return newState
        case GET_EVERY_LOCATION:
            action.locations.forEach((location) => {
                updateState.allLocations[location.id] = location
            })
            return updateState;
        case GET_EVERY_USER_LOCATION:
          action.locations.forEach((location) => {
              updateState.userLocations[location.id] = location
          })
          return updateState;
        case DELETE_LOCATION:
          delete updateState.userLocations[action.id];
          return updateState;
        case USER_LOGOUT:
          updateState.location = null;
          updateState.newLocation = null;
          updateState.allLocations = {};
          updateState.userLocations = {};
          return updateState;
        default:
            return state

    }
}

export default locationsReducer
