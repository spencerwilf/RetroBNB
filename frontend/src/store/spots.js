

const LOAD_SPOTS = 'spots/LOAD_SPOTS'
const LOAD_ONE_SPOT = 'spots/GRAB_SPOT'

const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    }
}

const loadOneSpot = (spot) => {
    return {
        type: LOAD_ONE_SPOT,
        spot
    }
}


export const fetchSpotsThunk = () => async (dispatch) => {
    const res = await fetch(`/api/spots`)
    if (res.ok) {
        const data = await res.json();
        dispatch(loadSpots(data))
    }
}

export const loadOneSpotThunk = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}`)
    if (res.ok) {
        const data = await res.json();
        dispatch(loadOneSpot(data))
    }
}

const initialState = {
    allSpots: {},
    singleSpot: {}
}



const spotsReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case LOAD_SPOTS:
            newState = {...state, allSpots: {}}
            action.spots.Spots.map(spot => newState.allSpots[spot.id] = spot)
            return newState
        case LOAD_ONE_SPOT:
            newState = {...state}
            newState.singleSpot = action.spot
            return newState
        default:
            return state
    }
}

export default spotsReducer
