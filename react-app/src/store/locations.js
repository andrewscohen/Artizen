
const NEW_LOCATION = 'locations/NEW_LOCATION'

const newLocation = (location) => ({
    type: NEW_LOCATION,
    payload: location, 
})

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
        // photo
        } = locationFile

        

    const res = await fetch('/api/locations/', {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data"
        }, 
        body: {
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
            }
    })

    dispatch(newLocation(res.json()))
    return res.json()
}


const initialState = {location: null}

const locationReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case NEW_LOCATION:
            newState = Object.assign({}, state)
            newState.location = action.payload
            return newState
        default:
            return state

    }
}

export default locationReducer