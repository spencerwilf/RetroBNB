import { csrfFetch } from "./csrf"

const GET_USER_BOOKINGS = 'bookings/GET_USER_BOOKINGS'
const DELETE_BOOKING = 'spots/DELETE_BOOKING'
const EDIT_BOOKING = 'spots/EDIT_BOOKING'



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


const editBooking = (booking) => {
    return {
        type: EDIT_BOOKING,
        booking
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


export const editBookingThunk = (booking) => async (dispatch) => {
    const res = await csrfFetch(`/api/bookings/${booking.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
    })
    if (res.ok) {
        const booking = res.json()
        dispatch(editBooking(booking))
        return booking
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
            newState = { ...state}
            delete newState[action.bookingId]
            return newState
        case EDIT_BOOKING:
            newState = { ...state, spotBookings: { ...state.spotBookings } }
            newState.spotBookings[action.booking.id] = action.booking
            return newState
        default:
            return state
    }
}


export default bookingReducer