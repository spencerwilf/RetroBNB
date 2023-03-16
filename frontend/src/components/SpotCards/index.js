import React from 'react'
import './SpotCards.css'

const SpotCard = ({spot}) => {

  return (
    <div className='card-div tooltip'>
      <span className='tooltiptext'>{spot.name}</span>

      <div className='landing-page-spot-container'>

        <div className='image-div'>
        <img src={spot.previewImage} alt='spot preview image' title={spot.name}/>
        </div>
        <div className='spot-info'>
          <div className='name-and-rating'>
    <h5 className='spot-name'>{spot.name}</h5>
    <span className='review-span'>
      {spot.avgRating === "No ratings yet." ? <span><i className="fa-solid fa-star"></i> New! </span>: (
        <>
        <i className="fa-solid fa-star"></i>
        {spot.avgRating}
        </>
      )}

    </span>
    </div>
    <p className='city'>{`${spot.city}, ${spot.state}`}</p>
    <p className='price'>${spot.price} night</p>
    </div>
    </div>
    </div>
  )
}

export default SpotCard
