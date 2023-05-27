import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSpotsThunk } from '../../store/spots'
import { Link } from 'react-router-dom'
import SpotCard from '../SpotCards'
import './LandingPage.css'
import MapContainer from '../Maps'

const LandingPage = () => {

    const spotsObj = useSelector(state => state.spots.allSpots)
    const spots = Object.values(spotsObj)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchSpotsThunk())
    }, [dispatch])


    if (!spotsObj) return null;

  return (
    <div className='home-page-front-wrapper'>
        <div>
    <div className='home-page-grid'>
        <div></div>
        {spotsObj && spots.map(spot => (
            <Link key={spot.id} to={`/spots/${spot.id}`}>
                <SpotCard spot={spot}/>
            </Link>
        ))}
    </div>
    {/* <div className='map-container'>
    <MapContainer/>
          </div> */}
      </div>
      </div>
  )
}

export default LandingPage
