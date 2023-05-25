import React, { useState } from 'react'
import { useModal } from "../../context/Modal";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { addBookingThunk } from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const CalendarModal = ({startDate, endDate, spotId}) => {

    const history = useHistory()
    const dispatch = useDispatch()
    const {closeModal} = useModal()


    async function book() {
        dispatch(addBookingThunk(spotId, {startDate, endDate}))
        history.push('/bookings')
        closeModal()

    }


    async function close() {
      await closeModal()
    }

    


  return (
    <div className='confirm-booking-modal'>
      <h2>Confirm booking</h2>
      <p>{`${startDate.toDateString()} to ${endDate.toDateString()}`}</p>
      <div className='calendar-modal-buttons'>
      <button onClick={book}>Reserve</button>
      <button onClick={close}>Cancel</button>
      </div>
    </div>
  )
}

export default CalendarModal