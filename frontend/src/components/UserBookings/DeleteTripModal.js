import React, { useState } from 'react'
import { useModal } from "../../context/Modal";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { addBookingThunk } from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { deleteBookingThunk } from '../../store/booking';

const DeleteTripModal = ({ spotId }) => {


    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const deleteBooking = () => {
        dispatch(deleteBookingThunk(spotId))
        closeModal()
    }

    async function close() {
        await closeModal()
    }




    return (
        <div id='delete-booking-confirm-modal' className='confirm-booking-modal'>
            <h3>Delete Booking?</h3>
   
   <div className='delete-booking-modal-buttons'>
            <button onClick={deleteBooking}>Confirm</button>
            <button onClick={close}>Cancel</button>
    </div>
        </div>
    )
}

export default DeleteTripModal