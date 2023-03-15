import React, { useState, useEffect } from 'react'
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from 'react-redux';
import './ReviewModal.css'

const ReviewModal = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const [review, setReview] = useState("");
    const [rating, setRating] = useState("");
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false)
    const { closeModal } = useModal();



    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch()
          .then(closeModal)
          .catch(
            async (res) => {
              const data = await res.json();
              if (data && data.errors) setErrors(Object.values(data.errors));
            }
          );
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
  <label htmlFor='description'></label>
  <textarea
    id='description'
    name='description'
    onChange={e => (e.target.value)}
  />
</div>
<div className="rating-input">
  <div className="child-star">
    <i className="fa-solid fa-star"></i>
  </div>
  <div className="child-star">
    <i className="fa-solid fa-star"></i>
  </div>
  <div className="child-star">
    <i className="fa-solid fa-star"></i>
  </div>
  <div className="child-star">
    <i className="fa-solid fa-star"></i>
  </div>
  <div className="child-star">
    <i className="fa-solid fa-star"></i>
  </div>
</div>
<button>Submit Your Review</button>
      </form>
      </div>
  )
}

export default ReviewModal
