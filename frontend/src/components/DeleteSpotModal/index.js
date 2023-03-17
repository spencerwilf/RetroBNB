import React from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import { deleteSpotThunk } from '../../store/spots'
import { useHistory } from 'react-router'
import './DeleteSpotModal.css'

const DeleteSpotModal = ({spotId}) => {

    const dispatch = useDispatch();
    const {closeModal} = useModal();
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(deleteSpotThunk(spotId)).then(closeModal)
        history.push(`/spots/current`)
      };

      const closeButton = (e) => {
        e.preventDefault();
        return closeModal();
      }


  return (
    <div className='delete-spot-form'>
<form className='delete-spot-entry-form' onSubmit={handleSubmit}>
    <h2>Confirm Delete</h2>
    <h3 className='delete-confirmation-text'>Are you sure you want to remove this spot?</h3>
    <div className='delete-spot-modal-buttons'>
    <button id='delete-spot-modal-delete-button' type='submit'>Yes (Delete Spot)</button>
    <button id='delete-spot-modal-keep-button' onClick={closeButton}>No (Keep Spot)</button>
    </div>
    </form>
    </div>
  )
}

export default DeleteSpotModal
