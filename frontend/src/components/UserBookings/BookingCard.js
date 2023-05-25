import React from 'react'
import './BookingCard.css'
import { useSelector } from 'react-redux'
import OpenModalButton from '../OpenModalButton';
import ReviewModal from '../ReviewModal'

const BookingCard = ({spot}) => {

    const today = new Date()
    const sessionUser = useSelector(state => state.session.user);
    const reviews = useSelector(state => state.reviews.spot)

    const reviewArr = Object.values(reviews)

    let userReviewId;
    if (sessionUser) {
        userReviewId = reviewArr?.filter(review => review?.userId === sessionUser?.id)
    }


    

    return (
        <div className='user-booking-card-wrapper'>
            <div style={{width:'50%'}}>
                <p style={{maxWidth:'60%'}}>{spot.Spot.name}</p>
                <p>{`${spot.Spot.city}, ${spot.Spot.state}, ${spot.Spot.country}`}</p>

                <div style={{marginTop:'2rem', fontWeight:'bold', marginBottom:'3rem'}}>
                <p>{`Start date: ${spot.startDate.slice(0,10)}`}</p>
                <p>{`End date: ${spot.endDate.slice(0,10)}`}</p>
                </div>

                {Date.parse(spot.startDate) > today.getTime() && (
                    <div className='edit-delete-trip-buttons'>

                        <button>Edit trip</button>
                        <button>Cancel trip</button>
                    </div>
                )}


                {sessionUser && userReviewId.length < 1 && spot?.ownerId !== sessionUser.id && Date.parse(spot.startDate) < today.getTime() && <OpenModalButton
                    buttonText="Post Your Review"
                    modalComponent={<ReviewModal />}
                />}


            </div>
            <div style={{width:'50%'}}>
                <img className='user-trips-img' alt='' src={spot.Spot.previewImage}/>
            </div>
        </div>
    )
}

export default BookingCard