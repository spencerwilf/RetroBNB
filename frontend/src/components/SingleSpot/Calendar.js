import React, { useState } from 'react'
import { useModal } from "../../context/Modal";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { addBookingThunk } from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';

const CalendarModal = ({startDate, endDate, spotId}) => {

    const dispatch = useDispatch()
    const {closeModal} = useModal()


    async function book() {
        dispatch(addBookingThunk(spotId, {startDate, endDate}))
        closeModal()
    }

    


  return (
    <div className='booking-container'>
      <h2>Book this spot?</h2>
      <p onClick={book}>Confirm</p>
      <p>Cancel</p>

    </div>
  )
}

export default CalendarModal