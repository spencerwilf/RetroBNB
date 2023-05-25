import React, { useEffect } from 'react'
import { getUserBookingsThunk } from '../../store/booking'
import { useDispatch, useSelector } from 'react-redux'
import BookingCard from './BookingCard'

const UserBookings = () => {

    const today = new Date()

    const dispatch = useDispatch()
    const trips = useSelector(state => state.userBookings)

    useEffect(() => {
        dispatch(getUserBookingsThunk())
    }, [dispatch])


    const upcomingTripsArr = Object.values(trips).filter(trip => new Date(Date.parse(trip.startDate)).getTime() > today.getTime())


    const pastTripsArr = Object.values(trips).filter(trip => new Date(Date.parse(trip.startDate)).getTime() < today.getTime())




  return (
    <div>
        {upcomingTripsArr.length ? (
            <>
                <h1 style={{marginLeft:'5px'}}>Upcoming Trips</h1>
                {upcomingTripsArr.map(trip => (
                  <BookingCard key={trip.id} spot={trip} />
                ))}
            </>
        ): <h1>No trips yet!</h1>}

        {pastTripsArr.length && (
            <>
                  <h1 style={{ marginLeft: '5px' }}>Past Trips</h1>
              {pastTripsArr.map(trip => (
                <BookingCard key={trip.id} spot={trip} />
              ))}
            </>
)}

    </div>
  )
}

export default UserBookings