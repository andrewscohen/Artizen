
const NEW_LOCATION = 'locations/NEW_LOCATION'

const newLocation = (location) => {
    
    return {
        type: NEW_LOCATION,
        payload: location, 
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
   

const initialState = {location: null}

const locationReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case NEW_LOCATION:
            
            newState = Object.assign({}, state)
            // { [location.id] : location }
            newState.location = action.payload
            return newState
        default:
            return state

    }
}

export default locationReducer