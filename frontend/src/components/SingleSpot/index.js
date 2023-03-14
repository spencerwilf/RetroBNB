import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { loadOneSpotThunk } from '../../store/spots'
import { loadSpotReviewsThunk } from '../../store/reviews'
import './SingleSpot.css'
import OpenModalButton from '../OpenModalButton';
import ReviewModal from '../ReviewModal'

const SingleSpot = () => {

    const {spotId} = useParams();
    const spot = useSelector(state => state.spots.singleSpot)
    const reviews = useSelector(state => state.reviews.spot)
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const reviewArr = Object.values(reviews)



    useEffect(() => {
        dispatch(loadOneSpotThunk(spotId))
        dispatch(loadSpotReviewsThunk(spotId))
    }, [dispatch, spotId])

    const onClick = () => {
        alert('Feature coming soon!')
    }


    if (!spot) return null


  return (
    <div>
        <h2>{spot.name}</h2>
        <div className='single-spot-info'>
            <div className='single-spot-reviews'>
        <i class="fa-solid fa-star"></i>
            <span id='single-star-rating'>{spot.avgStarRating}
            {spot.numReviews !== 0 ? ` • ${spot.numReviews} reviews` : ''}</span>
            <span>{`${spot.city}, ${spot.state}, ${spot.country}`}</span>
            </div>
        </div>
        <div>
    {spot.SpotImages?.length ? <img src={spot.SpotImages[0].url}/> : 'NO IMAGE FOUND'}
    </div>
        <div className='below-images'>
        <div className='left-side'>
        <h3>{`Hosted by ${spot?.Owner?.firstName} ${spot?.Owner?.lastName}`}</h3>
        <h5>{spot.description}</h5>
        </div>
        <div className='reserve-box'>
        <h3>${spot.price} night</h3>
        <button onClick={onClick}>Reserve</button>
        <div className='single-spot-reviews'>
        <i className="fa-solid fa-star"></i>
            <span id='single-star-rating'>{spot.avgStarRating}
            {spot.numReviews !== 0 ? ` • ${spot.numReviews} reviews` : ''}</span>
            </div>
        </div>
        </div>
        <div className='review-list'>
            <h2>Reviews</h2>
            {sessionUser && <OpenModalButton
          buttonText="Leave a review"
          modalComponent={<ReviewModal />}
        />}
    {reviewArr.length ? reviewArr.map(review => (
        <div key={review.id} className='indiv-reviews'>
            <h3>{review.User.firstName}</h3>
            <h4>{review.createdAt.slice(0, 10)}</h4>
            <h5><i className="fa-solid fa-star"></i>{review.stars}</h5>
            <h5>{review.review}</h5>
            ---------------
        </div>
    )) : <h3>No Reviews Yet!</h3>}
        </div>
    </div>
  )
}

export default SingleSpot
