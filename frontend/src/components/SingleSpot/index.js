import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { loadOneSpotThunk } from '../../store/spots'

const SingleSpot = () => {

    const {spotId} = useParams();
    const spot = useSelector(state => state.spots.singleSpot)
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(loadOneSpotThunk(spotId))
    }, [dispatch, spotId])


    if (!spot) return null

    // console.log(spot)

  return (
    <div>
        <h1>{spot.name}</h1>
        <h3>{`Hosted by ${spot?.Owner?.firstName} ${spot?.Owner?.lastName}`}</h3>
        <h3>
        <i class="fa-solid fa-star"></i>
            {spot.avgStarRating}
        </h3>
        <h3>{spot.price}</h3>
        <h3>{`Location: ${spot.city}, ${spot.state}, ${spot.country}`}</h3>
        <h5>{spot.description}</h5>
    </div>
  )
}

export default SingleSpot
