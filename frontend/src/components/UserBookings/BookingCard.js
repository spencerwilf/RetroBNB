import React from 'react'

const BookingCard = ({spot}) => {
    console.log('SPOT!!!',spot)
    return (
        <div className='card-div tooltip'>
            <span className='tooltiptext'>{spot.Spot.name}</span>

            <div className='landing-page-spot-container'>

                <div className='image-div'>
                    <img src={spot.Spot.previewImage} alt='spot preview image' title={spot.Spot.name} />
                </div>
                <div className='spot-info'>
                    <div className='name-and-rating'>
                        <h5 className='spot-name'>{spot.Spot.name}</h5>
                    </div>
                    <p>{spot.startDate.slice(0, 10)}  —  {spot.endDate.slice(0, 10)}</p>
                    <p className='city'>{`${spot.Spot.city}, ${spot.Spot.state}`}</p>
                </div>
            </div>
        </div>
    )
}

export default BookingCard