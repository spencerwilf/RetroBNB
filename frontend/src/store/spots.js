import { csrfFetch } from "./csrf"

const LOAD_SPOTS = 'spots/LOAD_SPOTS'
const LOAD_ONE_SPOT = 'spots/GRAB_SPOT'
const ADD_SPOT = 'spots/ADD_SPOT'
const ADD_SPOT_IMAGES = 'spots/ADD_SPOT_IMAGES'
const LOAD_USER_SPOTS = 'spots/LOAD_USER_SPOTS'
const DELETE_SPOT = 'spots/delete'
const EDIT_SPOT = 'spots/EDIT_SPOT'
const CLEAR_SPOT = 'spots/CLEAR_SPOT'
const ADD_BOOKING = 'spots/ADD_BOOKING'
const GET_BOOKINGS = 'spots/GET_BOOKINGS'

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


const loadBookings = (bookings) => {
    return {
        type: GET_BOOKINGS,
        bookings
    }
}

const addBooking = (booking) => {
    return {
        type: ADD_BOOKING,
        booking
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

const loadUserSpots = (spots) => {
    return {
        type: LOAD_USER_SPOTS,
        spots
    }
}

const deleteSpot = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId
    }
}

const editSpot = (spot) => {
    return {
        type: EDIT_SPOT,
        spot
    }
}


export const clearSpot = () => {
    return {
        type: CLEAR_SPOT
    }
}


export const fetchSpotsThunk = () => async (dispatch) => {
    const res = await csrfFetch(`/api/spots`)
    if (res.ok) {
        const data = await res.json();
        dispatch(loadSpots(data))
    }
}



export const loadBookingsThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`)
    if (res.ok) {
        const data = await res.json();
        dispatch(loadBookings(data))
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



export const addBookingThunk = (spotId, booking) => async (dispatch) => {

    const res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
    })

    if (res.ok) {
        const booking = await res.json();
        console.log('!!!!!',booking)
        dispatch(addBooking(booking))
        return booking
    }
}


export const getUserSpotsThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots/current');
    if (res.ok) {
        const spots = await res.json();
        dispatch(loadUserSpots(spots))
    }
}


export const deleteSpotThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        dispatch(deleteSpot(spotId))
    }
}


export const editSpotThunk = (spot, spotId) => async (dispatch) => {
    const owner = spot.Owner;
    const images = spot.SpotImages;
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(spot)
    })
    if (res.ok) {
        const spot = await res.json();
        spot.Owner = owner
        spot.SpotImages = images
        dispatch(editSpot(spot))
        return spot
    }
}

const initialState = {
    allSpots: {},
    singleSpot: {},
    userSpots: {},
    spotBookings: {}
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
        case LOAD_USER_SPOTS:
            newState = {...state, userSpots: {}}
            action.spots.Spots.map(spot => newState.userSpots[spot.id] = spot)
            return newState
        case DELETE_SPOT:
            newState = {...state, allSpots: {...state.allSpots}, userSpots: {...state.userSpots}};
            delete newState.allSpots[action.spotId]
            delete newState.userSpots[action.spotId]
            return newState
        case EDIT_SPOT:
            newState = {...state, allSpots: {...state.allSpots}, singleSpot: {}}
            newState.singleSpot = action.spot
            return newState
        case CLEAR_SPOT:
            return {...state, singleSpot: {}}
        case GET_BOOKINGS:
            newState = { ...state, spotBookings: {} }
            action.bookings.bookings.map((booking, i) => newState.spotBookings[i] = booking)
            return newState
        case ADD_BOOKING:
            newState = {...state, spotBookings: {...state.spotBookings}}
            newState.spotBookings[Object.values(newState.spotBookings).length] = action.booking
            return newState
        default:
            return state
    }
}

export default spotsReducer
