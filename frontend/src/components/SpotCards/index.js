import React, {useState, useEffect} from 'react'
import './SpotCards.css'
import Loading from '../LandingPage/Loading';

const SpotCard = ({spot}) => {

  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);


  return (
    <div className='card-div tooltip'>
      {/* <span className='tooltiptext'>{spot.name}</span> */}
      
        <div className='landing-page-spot-container'>
        {!isLoading ? (
          <>
          <div className='image-div'>
            <div className='image-div-2'>
              <img src={spot.previewImage} alt='spot preview image' title={spot.name} />
            </div>
          </div>
          <div className='spot-info'>
            <div className='name-and-rating'>
              <h5 className='spot-name'>{`${spot.city}, ${spot.state}`}</h5>
              <span className='review-span'>
                {spot.avgRating === "No ratings yet." ? <span><i className="fa-solid fa-star"></i> New! </span> : (
                  <>
                    <i className="fa-solid fa-star"></i>
                    {spot.avgRating}
                  </>
                )}

              </span>
            </div>
            <p className='city'>{spot.name}</p>
            <p className='price'>${spot.price} night</p>
          </div>
          </>

      ) : <div className='landing-page-spot-container'><Loading/></div>
      }

      </div>
    </div>
  )
}

export default SpotCard
