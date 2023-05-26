import React, { useState } from 'react'
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from 'react-redux';
import './ReviewModal.css'
import ReviewRating from '../ReviewRating';
import { addReviewThunk } from '../../store/reviews';

const ReviewModal = ({spotId}) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const [review, setReview] = useState("");
    const [rating, setRating] = useState("");
    const [errors, setErrors] = useState({});
    // const [isSubmitted, setIsSubmitted] = useState(false)
    const { closeModal } = useModal();


    const handleSubmit = (e) => {
        e.preventDefault();
        let validationErrors = {};

        if (review.length > 254) {
          validationErrors.review = 'Review must be less than 255 characters'
          setErrors(validationErrors)
          return alert('Please fix errors before submitting');
        }
        // setIsSubmitted(true);



        const newReview = {
            review,
            stars: rating
        }


        setErrors({});
         dispatch(addReviewThunk(newReview, spotId, user))
          .then(closeModal)

      };

  return (
    <div className='review-modal-wrapper-div'>
    <div id='review-modal'>
      <h2 className='review-box-header'>How was your stay?</h2>

      <form onSubmit={handleSubmit} className='leave-review-form'>

        <div>
  <label htmlFor='review'></label>
  <textarea
    id='review'
    placeholder='Please type at least 10 characters.'
    value={review}
    name='review'
    onChange={e => setReview(e.target.value)}
  />
</div>

{errors.review && (<p className='creation-errors'>{errors.review}</p>)}

<div className='review-modal-stars-text'>
  <ReviewRating rating={rating} setRating={setRating}/> stars</div>

<button className='leave-review-button' disabled={review.length < 10 || rating < 1}>Post</button>
      </form>
      </div>
      </div>
  )
}

export default ReviewModal
