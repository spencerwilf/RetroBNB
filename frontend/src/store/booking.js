import { csrfFetch } from "./csrf"

const GET_USER_BOOKINGS = 'bookings/GET_USER_BOOKINGS'


const getUserBookings = (bookings) => {
    return {
        type: GET_USER_BOOKINGS,
        bookings
    }
}


export const getUserBookingsThunk = () => async (dispatch) => {
    const res = await csrfFetch(`/api/bookings/current`)
    if (res.ok) {
        const data = await res.json();
        dispatch(getUserBookings(data))
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
        default:
            return state
    }
}


export default bookingReducer