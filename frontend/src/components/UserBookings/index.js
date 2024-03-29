import React, { useEffect, useState } from 'react'
import { getUserBookingsThunk } from '../../store/booking'
import { useDispatch, useSelector } from 'react-redux'
import BookingCard from './BookingCard'
import './BookingCard.css'

const UserBookings = () => {

    const [upcomingTrips, setUpcomingTrips] = useState(true)

    const today = new Date()

    const dispatch = useDispatch()
    const trips = useSelector(state => state.userBookings)

    useEffect(() => {
        dispatch(getUserBookingsThunk())
    }, [dispatch,, upcomingTrips])


    const upcomingTripsArr = Object.values(trips).filter(trip => new Date(Date.parse(trip.startDate)).getTime() > today.getTime())


    const pastTripsArr = Object.values(trips).filter(trip => new Date(Date.parse(trip.startDate)).getTime() < today.getTime())


    const setUpcoming = () => {
      setUpcomingTrips(!upcomingTrips)
    }


  return (
    <div className='user-trips-page-wrapper'>
      {upcomingTrips ? (
        
          upcomingTripsArr.length ? (
            <>
              <h1 style={{ fontWeight:'500' }}>Upcoming Trips</h1>
              <h5 style={{fontWeight:'300', cursor:'pointer'}} onClick={setUpcoming}>View past trips</h5>
              {upcomingTripsArr.map(trip => (
                <BookingCard key={trip.id} spot={trip} />
              ))}
            </>
          ) : <h1>No trips yet!</h1>
        

      ) : (
          
            pastTripsArr.length && (
              <>
                <h1 style={{ fontWeight:'500' }}>Where you've been</h1>
              <h5 style={{fontWeight:'300', cursor:'pointer'}} onClick={setUpcoming}>View upcoming trips</h5>
                {pastTripsArr.map(trip => (
                  <BookingCard key={trip.id} spot={trip} />
                ))}
              </>
            )
          
      )}
        


    </div>
  )
}

export default UserBookings