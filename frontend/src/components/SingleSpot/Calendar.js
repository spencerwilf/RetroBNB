import React, { useState } from 'react'
import { useModal } from "../../context/Modal";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { addBookingThunk } from '../../store/spots';
import { useDispatch } from 'react-redux';

const CalendarModal = ({spotId}) => {
    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const {closeModal} = useModal()
    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection',
    }

    console.log(typeof startDate)

    
    function handleSelect(ranges) {
        setStartDate(ranges.selection.startDate)
        setEndDate(ranges.selection.endDate)
    }

    function close() {
        closeModal()
    }

    async function book() {
        dispatch(addBookingThunk(spotId, {startDate, endDate}))
    }

  return (
    <div className='booking-container'>
          <DateRangePicker
              ranges={[selectionRange]}
              onChange={handleSelect}
          />


          <p>Your dates</p>
          <div className='start-and-end-dates'> 
          { <p>{startDate.toDateString()}</p>}
          {<p>{endDate.toDateString()}</p>}
          </div>


          <button onClick={book}>Book Spot</button>
          <button onClick={close}>Close</button>

    </div>
  )
}

export default CalendarModal