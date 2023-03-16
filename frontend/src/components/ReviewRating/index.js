import React from 'react'
import { useState } from 'react';
import './ReviewRating.css'

const ReviewRating = (props) => {

  const [hover, setHover] = useState(0);
  const stars = ['', '', '', '', '']

  return (
    <div className="star-rating">
      {stars.map((star, i) => {
        i++;
        return (
          <button
            type="button"
            key={i}
            id='star-buttons'
            className={i <= (hover || props.rating) ? "star-button-on" : "star-button-off"}
            onClick={() => props.setRating(i)}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(props.rating)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
}

export default ReviewRating
