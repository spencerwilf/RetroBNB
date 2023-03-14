import React from 'react'
import './SpotCards.css'

const SpotCard = ({spot}) => {


  return (
    <div className='card-div tooltip'>
      <span className='tooltiptext'>{spot.name}</span>
        <div className='image-div'>
        <img src={spot.previewImage} alt=''/>
        </div>
        <div className='spot-info'>
          <div className='name-and-price'>
    <p className='spot-name'>{spot.name}</p>
    <span className='review-span'>
    <i className="fa-solid fa-star"></i>
    {spot.avgRating}
    </span>
    </div>
    <p className='price'>${spot.price} night</p>
    <p className='city'>{spot.city}</p>
    </div>
    </div>
  )
}

export default SpotCard
