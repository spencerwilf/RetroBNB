import React from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import { deleteSpotThunk } from '../../store/spots'
import { useHistory } from 'react-router'

const DeleteSpotModal = ({spotId}) => {

    const dispatch = useDispatch();
    const {closeModal} = useModal();
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault();
         dispatch(deleteSpotThunk(spotId))
        .then(closeModal)
        history.push(`/spots/current`)
      };

      const closeButton = (e) => {
        e.preventDefault();
        return closeModal();
      }


  return (
    <div className='delete-spot-form'>
<form onSubmit={handleSubmit}>
    <h2>Confirm deletion</h2>
    <h3>Are you sure you want to remove this spot?</h3>
    <button type='submit'>Yes (Delete Spot)</button>
    <button onClick={closeButton}>No (Keep Spot)</button>
    </form>
    </div>
  )
}

export default DeleteSpotModal
