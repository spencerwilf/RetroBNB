import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
const ADD_REVIEW = 'reviews/ADD_REVIEW'
const DELETE_REVIEW = 'reviews/DELETE_REVIEW'

const loadReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        reviews
    }
}

const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        review
    }
}

const deleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}

export const loadSpotReviewsThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/spots/${id}/reviews`);
    if (res.ok) {
        const reviews = await res.json()
        dispatch(loadReviews(reviews))
    }
}

export const addReviewThunk = (review, spotId, user) => async(dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(review)
    })

    if (res.ok) {
        const review = await res.json()
        review.User = {id: user.id, firstName: user.firstName, lastName: user.lastName}
        dispatch(addReview(review))
    }

}


export const deleteReviewThunk = (reviewId) => async(dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        dispatch(deleteReview(reviewId))
    }
}

const initialState = {
    spot: {},
    user: {}
}

const reviewReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case LOAD_REVIEWS:
            newState = {...action.reviews.Reviews}
            let newReviews = Object.values(newState);
            let normalized = {}
            newReviews.forEach((review) => normalized[review.id] = review)
            return {...state, spot: normalized}
        case ADD_REVIEW:
            return {...state, spot: {...state.spot, ...action.review}, user: {...state.user, ...action.review}}
        case DELETE_REVIEW:
            newState = {...state, spot: {...state.spot}, user: {...state.user}}
            delete newState.spot[action.reviewId];
            delete newState.user[action.reviewId];
            return newState
        default:
            return state
    }
}

export default reviewReducer
