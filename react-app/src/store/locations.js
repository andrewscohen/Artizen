import { useDispatch } from 'react-redux'


const NEW_LOCATION = 'locations/NEW_LOCATION'

const newLocation = (location) => ({
    type: NEW_LOCATION,
    payload: location, 
})

export const addLocation = (locationFile) => async (dispatch) => {
    
    const { 
        userId,
        title,
        artist,
        address,
        city,
        state,
        zip,
        description,
        lat, 
        long,
        // photo
        } = locationFile

    const formData = new FormData();
    formData.append('user_id', userId)
    formData.append('street_address', address)
    formData.append('city', city)
    formData.append('state', state)
    formData.append('zip_code', zip)
    formData.append('title', title)
    formData.append('artist', artist)
    formData.append('description', description)
    formData.append('lat', lat)
    formData.append('long', long)
    // formData.append('photo', photo)
    
    const res = await fetch ('/api/locations', {
        method: 'POST',
        headers: {
            "Content-Type": "multi-part/form-data"
        }, 
        body: formData,
    })

    dispatch(newLocation(res.data.locationFile))
    return res.data.locationFile
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