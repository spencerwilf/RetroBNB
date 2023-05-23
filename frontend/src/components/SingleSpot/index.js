import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { loadOneSpotThunk } from '../../store/spots'
import { loadSpotReviewsThunk } from '../../store/reviews'
import './SingleSpot.css'
import OpenModalButton from '../OpenModalButton';
import ReviewModal from '../ReviewModal'
import DeleteReviewModal from '../DeleteReviewModal'
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem'
import { clearSpot } from '../../store/spots'
import CalendarModal from './Calendar'
import { loadBookingsThunk } from '../../store/spots'


const SingleSpot = () => {

    const {spotId} = useParams();
    const spot = useSelector(state => state.spots.singleSpot)
    const reviews = useSelector(state => state.reviews.spot)
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const images = spot?.SpotImages;

    // if (!reviews) return null;

    const reviewArr = Object.values(reviews).sort((a, b) => b.id - a.id);


    useEffect(() => {
        dispatch(loadOneSpotThunk(spotId))
        dispatch(loadSpotReviewsThunk(spotId))
        dispatch(loadBookingsThunk(spotId))

        return () => {
            dispatch(clearSpot())
        }
    }, [dispatch, spotId, reviewArr.length])

    // const onClick = () => {
    //     alert('Feature coming soon!')
    // }

    let userReviewId;
    if (sessionUser) {
        userReviewId = reviewArr?.filter(review => review?.userId === sessionUser?.id)
    }



    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false)
            }
        }
        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu)
    }, [showMenu])

    const closeMenu = () => setShowMenu(false)


    if (!spot) return null;
    if (!images) return null;


  return (
    <div className='single-listing-page'>

    <div className='listing-header'>
            <h2 className='listing-header-name'>{spot.name}</h2>

            <span>{`${spot.city}, ${spot.state}, ${spot.country}`}</span>
    </div>



<div className='spot-image-flex-container'>
    <div className='single-spot-images'>
        <div className='single-spot-big-image'>
        {spot.SpotImages?.length ? <img clasName='main-spot-image' src={spot.SpotImages[0].url} alt=''/> : 'NO IMAGE FOUND'}
        </div>
    <div className='single-spot-small-images-column-one'>
        {images[1] && <img className='single-spot-small-image' src={images[1].url} alt=''/>}
        {images[2] && <img className='single-spot-small-image' src={images[2].url} alt=''/>}
        </div>
        <div className='single-spot-small-images-column-two'>
        {images[3] && <img id='img3' className='single-spot-small-image' src={images[3].url} alt=''/>}
        {images[4] && <img id='img4' className='single-spot-small-image' src={images[4].url} alt=''/>}
        </div>
    </div>
    </div>

    <div className='bottom-page-info'>

<div className='left-hand-listing-details'>

        <div className='host-and-description'>
        <h3>{`Hosted by ${spot?.Owner?.firstName} ${spot?.Owner?.lastName}`}</h3>
        <h5>{spot.description}</h5>
        </div>

        </div>

<div className='right-hand-listing-details'>
    <div className='reserve-box-container'>
        <div className='reserve-box-information'>
            <div className='reserve-spot-box-top-area'>
        <h3 id='reserve-box-price'>${spot?.price} night</h3>
        <div className='single-spot-reviews'>
        <i className="fa-solid fa-star"></i>
            <span id='single-star-rating'>{spot.avgStarRating}
            {spot.numReviews !== 0 ? (spot.numReviews === 1 ? (` • ${spot.numReviews} review`) : ` • ${spot.numReviews} reviews` ) : ''}</span>
            </div>
                          </div>
                        
                            {spot.Owner.id !== sessionUser.id ? (
                              <OpenModalButton
                                  buttonText="Reserve"
                                  modalComponent={<CalendarModal spotId={spotId} />}

                              />
                            ): <p>Manage your spot</p>}
                          

         </div>
                      
    </div>
</div>



        </div>

        <div className='review-list'>
            <div className='review-section-header'>
            <h2>Reviews</h2>

            {reviewArr.length > 0 && <div className='single-spot-reviews'>
            <i className="fa-solid fa-star"></i>
            <span id='single-star-rating'>{spot.avgStarRating}
            {spot.numReviews !== 0 ? (spot.numReviews === 1 ? (` • ${spot.numReviews} review`) : ` • ${spot.numReviews} reviews` ) : ''}</span></div>}
            </div>

            {sessionUser && userReviewId.length < 1 && spot?.ownerId !== sessionUser.id && <OpenModalButton
          buttonText="Post Your Review"
          modalComponent={<ReviewModal spotId={spotId}/>}
        />}
    {reviewArr?.length ? reviewArr?.map(review => (
        <div key={review?.id} className='indiv-reviews'>
            <h3>{review?.User?.firstName}</h3>
            <h4>{review?.createdAt?.slice(0, 10)}</h4>
            <h5><i className="fa-solid fa-star"></i>{review?.stars}</h5>
            <h5>{review?.review}</h5>
            {review?.userId === sessionUser?.id && (
                <button>
                <OpenModalMenuItem
                itemText='Delete'
                onItemClick={closeMenu}
                modalComponent={<DeleteReviewModal reviewId = {review.id}/>} />
            </button>
            )}
        </div>
    )) : (sessionUser && sessionUser?.id !== spot?.ownerId) ? <h3>Be the first to leave a review!</h3> : <h3>No Reviews Yet!</h3>}
        </div>

    </div>
  )
}

export default SingleSpot
