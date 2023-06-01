import React, { useRef, useState, useEffect } from 'react'
import './BookingCard.css'
import { useDispatch, useSelector } from 'react-redux'
import OpenModalButton from '../OpenModalButton';
import ReviewModal from '../ReviewModal'
import loadSpotReviewsThunk from '../../store/reviews'
import { deleteBookingThunk } from '../../store/booking';
import CalendarModal from '../SingleSpot/Calendar';
import { useModal } from '../../context/Modal';
import { DateRangePicker } from 'react-date-range';
import EditCalendarModal from './EditTripModal';
import DeleteTripModal from './DeleteTripModal';

const BookingCard = ({spot}) => {

    const today = new Date()
    const sessionUser = useSelector(state => state.session.user);
    const reviews = useSelector(state => state.reviews.spot)
    const dispatch = useDispatch()
    const { setModalContent } = useModal()
    const [showCalendar, setShowCalendar] = useState(false)
  
    const excludedElementRef = useRef(null);
    
    console.log(spot)
    

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



    const reviewArr = Object.values(reviews)

    let userReviewId;
    if (sessionUser) {
        userReviewId = reviewArr?.filter(review => review?.userId === sessionUser?.id)
    }

    const options = { month: 'long', day: 'numeric', year: 'numeric' };


    const setContent = () => {
        setModalContent(<EditCalendarModal startDate={new Date(spot.startDate)} endDate={new Date(spot.endDate)} spot={spot} />)
    }


    const setDeleteContent = () => {
        setModalContent(<DeleteTripModal spotId={spot.id} />)
    }


    const deleteBooking = () => {
        dispatch(deleteBookingThunk(spot.id))
    }

    

    return (
        <div className='user-booking-card-wrapper'>

            <div style={{width:'50%'}}>

                <div>
                <p style={{marginTop:'0', maxWidth:'90%', fontSize:'18px', fontWeight:'500'}}>{spot.Spot.name}</p>
                    <p style={{ fontSize: '14px', color: '#717171', fontWeight: '300', }}>{`${spot.Spot.city}, ${spot.Spot.state}, ${spot.Spot.country}`}</p>
                </div>

                <div style={{marginTop:'2rem', fontWeight:'bold'}}>
                    <div>
                        <div>
                        <p style={{fontWeight:'500'}}>Dates</p>
                            <p style={{ fontSize: '14px', color: '#717171', fontWeight: '300' }}>{`${new Date(spot.startDate).toLocaleDateString('en-US', options)} to ${new Date(spot.endDate).toLocaleDateString('en-US', options)}`}</p>
                            <p style={{ marginTop:'20px', fontWeight: '500' }}>Nights</p>
                            <p style={{ fontSize: '14px', color: '#717171', fontWeight: '300' }}>{(new Date(spot.endDate) - new Date(spot.startDate)) / (24 * 60 * 60 * 1000)} {(new Date(spot.endDate) - new Date(spot.startDate)) / (24 * 60 * 60 * 1000) === 1 ? <span>night</span> : <span>nights</span>}</p>
                        </div>
                      {new Date(spot.startDate).getTime() > new Date().getTime() && (
                        <div className='booking-edit-and-delete-button-container'>
                                <p className='edit-cancel-bookings' onClick={setContent}>Edit</p>
                                
                        <p className='edit-cancel-bookings' onClick={setDeleteContent}>Cancel</p>
                        </div>
                      )}

                    </div>
                </div>
            </div>
            <div style={{width:'50%'}}>
                <img className='user-trips-img' alt='' src={spot.Spot.previewImage}/>
            </div>
        </div>
    )
}

export default BookingCard