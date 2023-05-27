import { csrfFetch } from "./csrf"

const GET_USER_BOOKINGS = 'bookings/GET_USER_BOOKINGS'
const DELETE_BOOKING = 'spots/DELETE_BOOKING'



const getUserBookings = (bookings) => {
    return {
        type: GET_USER_BOOKINGS,
        bookings
    }
}


const deleteBooking = (bookingId) => {
    return {
        type: DELETE_BOOKING,
        bookingId
    }
}


export const getUserBookingsThunk = () => async (dispatch) => {
    const res = await csrfFetch(`/api/bookings/current`)
    if (res.ok) {
        const data = await res.json();
        dispatch(getUserBookings(data))
    }
}


export const deleteBookingThunk = (bookingId) => async (dispatch) => {
    const res = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        dispatch(deleteBooking(bookingId))
    }
}


const initialState = {}


const bookingReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_USER_BOOKINGS:
            newState = {}
            action.bookings.Bookings.map(booking => newState[booking.id] = booking)
            return newState
        case DELETE_BOOKING:
            newState = { ...state, spotBookings: { ...state.spotBookings } }
            delete newState.spotBookings[action.bookingId]
            return newState
        default:
            return state
    }
}


export default bookingReducer