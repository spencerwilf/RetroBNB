import { csrfFetch } from "./csrf"

const LOAD_SPOTS = 'spots/LOAD_SPOTS'
const LOAD_ONE_SPOT = 'spots/GRAB_SPOT'
const ADD_SPOT = 'spots/ADD_SPOT'
const ADD_SPOT_IMAGES = 'spots/ADD_SPOT_IMAGES'

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

const addSpot = (spot) => {
    return {
        type: ADD_SPOT,
        spot
    }
}

const addSpotImages = (spot, spotImages) => {
    return {
        type: ADD_SPOT_IMAGES,
        payload: {
            spot,
            spotImages
        }
    }
}


export const fetchSpotsThunk = () => async (dispatch) => {
    const res = await csrfFetch(`/api/spots`)
    if (res.ok) {
        const data = await res.json();
        dispatch(loadSpots(data))
    }
}

export const loadOneSpotThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`)
    if (res.ok) {
        const data = await res.json();
        dispatch(loadOneSpot(data))
        return data
    }
}

export const addSpotThunk = (spot, images) => async (dispatch) => {

    const owner = spot.Owner

    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(spot)
    })

    if (res.ok) {
        const spot = await res.json();
        dispatch(addSpot(spot))
        spot['SpotImages'] = [];
        for (let image of images) {
            let spotImages = await csrfFetch(`/api/spots/${spot.id}/images`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(image)
            })
            if (spotImages.ok) {
                let newImage = await spotImages.json();
                spot.SpotImages.push(newImage)
            }
        }

        spot.Owner = owner
        dispatch(addSpotImages(spot, spot.SpotImages))
         return spot
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
        case ADD_SPOT:
            return {...state, singleSpot: {...action.spot}}
        case ADD_SPOT_IMAGES:
            return {...state, singleSpot: {...action.payload.spot, SpotImages: action.payload.spotImages}}
        default:
            return state
    }
}

export default spotsReducer
