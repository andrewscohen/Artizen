const SET_CITY = 'map/setCity'
const SEARCH_MAP = 'map/searchMap'

export const setCity = (city) => {
    return { 
        type: SET_CITY, 
        payload: city
    }
}

export const searchMap = (search) => {
    return { 
        type: SEARCH_MAP, 
        payload: search
    }
}


export const searchCity = (city) => async dispatch => {
    await dispatch(setCity(city));
    return city
}

const mapReducer = (state = { city: null }, action) => {
    let newState = { ...state }
    switch (action.type) {
        case SET_CITY:
            newState.city = action.payload
            return newState
        case SEARCH_MAP:
            newState.city = action.payload
            return newState
        default: 
            return state
    }
}

export default mapReducer