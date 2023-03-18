import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../context/Modal';
import { deleteReviewThunk } from '../../store/reviews';
import './DeleteReviewModal.css'

const DeleteReviewModal = ({reviewId}) => {
    const dispatch = useDispatch();
    const {closeModal} = useModal();
    const spot = useSelector(state => state.spots.singleSpot);
    const targetReview = useSelector(state => state.reviews.spot[reviewId]);

    if (!spot) return null

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(deleteReviewThunk(reviewId));
        closeModal();
    }


  return (
    <div className='delete-review-form-wrapper'>
    <form className='delete-review-form' onSubmit={onSubmit}>
        <h2>Confirm Delete</h2>
        <h3 id='confirm-delete-review-text'>Are you sure you want to delete this review?</h3>
        <div id='confirm-delete-button-group' className='delete-spot-modal-buttons'>
        <button id='delete-review-confirm-button' type='submit'>Yes (Delete Review)</button>
        <button onClick={closeModal}>No (Keep Review)</button>
        </div>
    </form>
    </div>
  )
}

export default DeleteReviewModal
