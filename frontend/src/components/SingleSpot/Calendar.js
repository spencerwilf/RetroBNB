import React, { useState } from 'react'
import { useModal } from "../../context/Modal";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { addBookingThunk } from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';

const CalendarModal = ({spotId}) => {

    const currentDate = new Date(); 
    const tomorrow = new Date();
    tomorrow.setDate(currentDate.getDate() + 1);

    const bookings = useSelector(state => state.spots.spotBookings)
    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState(tomorrow)
    const [endDate, setEndDate] = useState(tomorrow)
    const {closeModal} = useModal()
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

    function close() {
        closeModal()
    }

    async function book() {
        dispatch(addBookingThunk(spotId, {startDate, endDate}))
        closeModal()
    }


    let bookedDates = Object.values(bookings).map((booking) => ({
         start: new Date(booking.startDate.slice(0,10)), 
         end: new Date(booking.endDate.slice(0,10)),
        //  display: 'none'
    }))

    console.log(bookedDates)



  return (
    <div className='booking-container'>
          <p style={{alignSelf:'end', marginRight:'2rem', cursor:'pointer'}} onClick={close}><i className="fa-solid fa-x"></i></p>
          <DateRangePicker
              ranges={[selectionRange]}
              onChange={handleSelect}
              minDate={minDate}
              disabledDates={bookedDates}
              sel
          />


          <p>Your dates</p>
          <div className='start-and-end-dates'> 
          {<p>{startDate.toDateString()}</p>}
          {<p>{endDate.toDateString()}</p>}
          </div>

            <div className='book-and-close-buttons'>
          <button onClick={book}>Confirm booking</button>
          
          </div>
    </div>
  )
}

export default CalendarModal