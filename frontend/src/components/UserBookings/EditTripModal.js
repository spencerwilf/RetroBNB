import React, { useState } from 'react'
import { useModal } from "../../context/Modal";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { addBookingThunk } from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { editBookingThunk } from '../../store/booking';

const EditCalendarModal = ({ startDate, endDate, spot }) => {

    const history = useHistory()
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const [newStartDate, setStartDate] = useState(new Date(startDate))
    const [newEndDate, setEndDate] = useState(new Date(endDate))

    const editBooking = () => {
        spot.startDate = newStartDate
        spot.endDate = newEndDate
        dispatch(editBookingThunk(spot))
        closeModal()
    }

    const selectionRange = {
        startDate: newStartDate,
        endDate: newEndDate,
        key: 'selection',
    }

    function handleSelect(ranges) {
        setStartDate(ranges.selection.startDate)
        setEndDate(ranges.selection.endDate)
    }


    // async function book() {
    //     dispatch(addBookingThunk(spotId, { startDate, endDate }))
    //     history.push('/bookings')
    //     closeModal()

    // }


    async function close() {
        await closeModal()
    }




    return (
        <div className='confirm-booking-modal'>
            <h3>Edit Dates</h3>
            <DateRangePicker
                ranges={[selectionRange]}
                onChange={handleSelect}
            />
            <button className='edit-date-confirm-button' onClick={editBooking}>Confirm</button>
        </div>
    )
}

export default EditCalendarModal