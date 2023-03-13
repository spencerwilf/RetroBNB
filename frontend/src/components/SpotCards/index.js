import React from 'react'
import './SpotCards.css'

const SpotCard = ({spot}) => {



  return (
    <div className='card-div'>
        <div className='image-div'>
        <img src='https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg' alt=''/>
        </div>
        <div className='spot-info'>
    <p className='spot-name'>{spot.name}</p>
    <p>${spot.price} night</p>
    <p>{spot.city}</p>
    <div className='rating'>
    <i class="fa-solid fa-star"></i>
    {spot.avgRating}
    </div>

    </div>

    </div>
  )
}

export default SpotCard
