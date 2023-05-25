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
import { Link } from 'react-router-dom';
import { useModal } from '../../context/Modal'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { addBookingThunk } from '../../store/spots';
import DatePicker from "react-datepicker";
import LoginFormModal from '../LoginFormModal'
import { addDays, isBefore, isAfter } from 'date-fns';

const SingleSpot = () => {

    const currentDate = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(currentDate.getDate() + 1);
    const excludedElementRef = useRef(null);

    const [startDate, setStartDate] = useState(tomorrow)
    const [endDate, setEndDate] = useState(tomorrow)
    const bookings = useSelector(state => state.spots.spotBookings)
    const {spotId} = useParams();
    const spot = useSelector(state => state.spots.singleSpot)
    const reviews = useSelector(state => state.reviews.spot)
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false)
    const ulRef = useRef();
    const {setModalContent} = useModal()

    const images = spot?.SpotImages;
    



    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection',
    }


    const today = new Date();
    const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);



    function handleSelect(ranges) {
        setStartDate(ranges.selection.startDate)
        setEndDate(ranges.selection.endDate)
    }

    // function close() {
    //     closeModal()
    // }



    let bookedDates = Object.values(bookings).map((booking) => ({
        start: new Date(booking.startDate.slice(0, 10)),
        end: new Date(booking.endDate.slice(0, 10)),
        //  display: 'none'
    }))


    const isDateDisabled = (date) => {
        for (const prebookedDate of bookedDates) {
            if (isBefore(date, addDays(prebookedDate, 1)) && isAfter(date, addDays(prebookedDate, -1))) {
                return true;
            }
        }
        return false;
    };

 


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

        const handleClick = (event) => {
            if (!excludedElementRef.current.contains(event.target) && showCalendar) {
                setShowCalendar(false);
            }
        };

        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, [showCalendar]);


    
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




    const handleDateClick = () => {
        setShowCalendar(!showCalendar)
    }


    const setContent = () => {
        sessionUser ? setModalContent(<CalendarModal startDate={startDate} endDate={endDate} spotId={spotId}/>) : setModalContent(<LoginFormModal/>)
    }

console.log(showCalendar)

  return (
    <div className='single-listing-page'>

    <div className='listing-header'>
            <h2 className='listing-header-name'>{spot.name}</h2>

            <span>{`${spot.city}, ${spot.state}, ${spot.country}`}</span>
    </div>



<div className='spot-image-flex-container'>
    <div className='single-spot-images'>
        <div className='single-spot-big-image'>
        {spot.SpotImages?.length ? <img className='main-spot-image' src={spot.SpotImages[0].url} alt=''/> : 'NO IMAGE FOUND'}
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
        <h2 style={{fontWeight:'500'}}>{`Hosted by ${spot?.Owner?.firstName} ${spot?.Owner?.lastName}`}</h2>
        <p style={{fontSize:'14px', lineHeight:'22px'}}>{spot.description}</p>

                      {/* <DateRangePicker
                          ranges={[selectionRange]}
                          onChange={handleSelect}
                          minDate={minDate}
                          disabledDate={isDateDisabled}
                          className='date-picker-2'
                      /> */}
        </div>

        </div>

<div className='right-hand-listing-details'>
{sessionUser?.id !== spot.Owner.id ? <div className='reserve-box-container'>
        <div className='reserve-box-information'>
            <div className='reserve-spot-box-top-area'>
        <h3 id='reserve-box-price'>${spot.price} night</h3>
        <div className='single-spot-reviews'>
        
                                  <span id='single-star-rating'>
                                <i id='reserve-box-star-icon' className="fa-solid fa-star"></i>
                                      <span >{spot.avgStarRating}</span>
                                      <span style={{ color:'#717171'}}>{spot.numReviews !== 0 ? (spot.numReviews === 1 ? (` • ${spot.numReviews} review`) : ` • ${spot.numReviews} reviews`) : ''}</span>
                                </span>
            </div>
                          </div>

                          <div  className='check-in-checkout-guests'>
                              <div onClick={handleDateClick} className='check-in-checkout-upper'>
                                  <div className='checkin'>
                                    <span className='box-check-labels'>CHECK-IN</span>
                                    <p className='box-date'>{startDate.toLocaleDateString('en-US', {
                                      month: 'long',
                                      day: 'numeric',
                                      year: 'numeric',
                                  })}</p>
                                  </div>
                                  <div className='checkout'>
                                      <span className='box-check-labels'>CHECKOUT</span>
                                    <p className='box-date'>{endDate.toLocaleDateString('en-US', {
                                      month: 'long',
                                      day: 'numeric',
                                      year: 'numeric',
                                  })}</p></div>
                            </div>
                            {/* <div>Guests placeholder</div> */}
                          </div>
                        
                            {spot.Owner.id !== sessionUser?.id ? (
                             
                               
                              showCalendar && (
                                  <div ref={excludedElementRef} className='booking-container'>
                                      {/* <p style={{alignSelf:'end', marginRight:'2rem', cursor:'pointer'}} onClick={close}><i className="fa-solid fa-x"></i></p> */}
                                      <DateRangePicker
                                          ranges={[selectionRange]}
                                          onChange={handleSelect}
                                          minDate={minDate}
                                          disabledDate={isDateDisabled}
                                      />


                                      <button className='dates-button' onClick={handleDateClick}>Confirm Dates</button>
                                  </div>
                                  
                              )
                           
                            ): null}
                          
                          <div>
                            <div style={{marginTop:'2rem'}}>
                          <div className='nights-and-prices'>
                                      <p>${`${spot?.price} x ${(endDate - startDate)/(24 * 60 * 60 * 1000) } nights`}</p>
                                      <p>${(spot?.price * ((endDate - startDate) / (24 * 60 * 60 * 1000))).toFixed(2)}</p>
                          </div>
                          <div className='nights-and-prices'>
                           <p>Cleaning fee</p>
                                      <p>${((spot.price * (endDate - startDate) / (24 * 60 * 60 * 1000)) * .12).toFixed(2)}</p>
                            </div>
                          <div className='nights-and-prices'>
                            <p>Total Cost</p>
                                      <p>${(((spot.price * ((endDate - startDate) / (24 * 60 * 60 * 1000))) * .12) + spot.price * (endDate - startDate) / (24 * 60 * 60 * 1000)).toFixed(2)}</p>
                        </div>
                              </div>
                              <div>

                              </div>
                          </div>
                          
         </div>
                      <button onClick={setContent} className='reserve-button'>Reserve</button>

         
                      
    </div> : <Link to='/spots/current'>Manage Spot</Link>}
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
