const GET_ONE_LOCATION = "locations/GET_ONE_LOCATION";

const getOneLocation = location => {
  return {
    type: GET_ONE_LOCATION,
    payload: location,
  };
};

const GET_EVERY_LOCATION = "locations/GET_EVERY_LOCATION";

const getEveryLocation = locations => {
    return {
        type: GET_EVERY_LOCATION,
        payload: locations
    }
}

const NEW_LOCATION = "locations/add/new_LOCATION"

const newLocation = (location) => {

    return {
        type: NEW_LOCATION,
        payload: location,
    }
}

export const getLocation = locationId => async dispatch => {
    const res = await fetch(`/api/locations/get/${locationId}`);
    const data = await res.json();

    dispatch(getOneLocation(data));
  };

export const getAllLocations = () => async dispatch => {
    const res = await fetch(`/api/locations/get/all`);
    const data = await res.json();

    dispatch(getEveryLocation(data));
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


const initialState = {location: null}

const locationsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case NEW_LOCATION:
            newState = Object.assign({}, state)
            // { [location.id] : location }
            newState.location = action.payload
            return newState
        case GET_ONE_LOCATION:
            return action.payload;
        case GET_EVERY_LOCATION:
            return action.payload;
        default:
            return state

    }
}

export default locationsReducer
