const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'

const loadReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        reviews
    }
}

export const loadSpotReviewsThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/spots/${id}/reviews`);
    if (res.ok) {
        const reviews = await res.json()
        dispatch(loadReviews(reviews))
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
        default:
            return state
    }
}

export default reviewReducer
