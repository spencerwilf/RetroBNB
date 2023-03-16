import React, { useState, useEffect } from 'react'
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
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
    const [isSubmitted, setIsSubmitted] = useState(false)
    const { closeModal } = useModal();


    console.log(rating, review.length)

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);

        if (Object.values(errors).length > 0) {
            return alert('Please fix errors before submitting');
        }

        const newReview = {
            review,
            stars: rating
        }


        setErrors({});
         dispatch(addReviewThunk(newReview, spotId, user))
          .then(closeModal)

      };

  return (
    <div id='review-modal'>
      <h3>How was your stay?</h3>
      <form onSubmit={handleSubmit}>
        <ul>
          {Object.values(errors).map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div>
  <label htmlFor='review'></label>
  <textarea
    id='review'
    placeholder='Leave your review here...'
    value={review}
    name='review'
    onChange={e => setReview(e.target.value)}
  />
</div>

<div><ReviewRating rating={rating} setRating={setRating}/> stars</div>

<button disabled={review.length < 10 || rating < 1}>Submit Your Review</button>
      </form>
      </div>
  )
}

export default ReviewModal
