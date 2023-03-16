import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../context/Modal';
import { deleteReviewThunk } from '../../store/reviews';

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
    <form onSubmit={onSubmit}>
        <h2>Confirm Delete</h2>
        <h3>Are you sure you want to delete this review?</h3>
        <button type='submit'>Yes (Delete Review)</button>
        <button onClick={closeModal}>No (Keep Review)</button>
    </form>
  )
}

export default DeleteReviewModal
