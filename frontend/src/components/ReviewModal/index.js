import React, { useState } from 'react'
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import { useModal } from "../../context/Modal";
import { useDispatch } from 'react-redux';

const ReviewModal = () => {

    const dispatch = useDispatch();
    const [review, setReview] = useState("");
    const [stars, setStars] = useState("");
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
    <>
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
<button>Submit Your Review</button>
      </form>
    </>
  )
}

export default ReviewModal
