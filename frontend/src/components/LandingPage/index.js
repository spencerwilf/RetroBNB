import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSpotsThunk } from '../../store/spots'
import { Link } from 'react-router-dom'
import SpotCard from '../SpotCards'
import './LandingPage.css'
import MapContainer from '../Maps'
import Loading from './Loading'

const LandingPage = () => {

    const spotsObj = useSelector(state => state.spots.allSpots)
    const spots = Object.values(spotsObj)
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch()

    

    // useEffect(() => {
    //     // Simulate loading delay
    //     setTimeout(() => {
    //         setIsLoading(false);
    //     }, 2000);
    // }, []);
    

    useEffect(() => {
        dispatch(fetchSpotsThunk())
    }, [dispatch])


    if (!spotsObj) return null;

  return (
    <div className='home-page-front-wrapper'>
       
    <div className='home-page-grid'>
        {spotsObj && spots.map(spot => (
            <Link key={spot.id} to={`/spots/${spot.id}`}>
                <SpotCard spot={spot}/>
            </Link>
        ))}

    {/* <div className='map-container'>
    <MapContainer/>
          </div> */}
      </div>
      <footer className='home-footer'>
              <span>© 2023 RetroBnb, Inc.</span>
              <div className='footer-socials'>
                  <a target='_blank' href='https://www.linkedin.com/in/spencer-wilfahrt-1a4604156/'><span className='footer-indiv-socials'><i class="fa-brands fa-linkedin"></i>Linkedin</span></a>
                  <a target='_blank' href='https://github.com/spencerwilf'><span className='footer-indiv-socials'><i class="fa-brands fa-github"></i>Github</span></a>
                  <a target='_blank' href='https://wellfound.com/u/spencer-wilfahrt'><span className='footer-indiv-socials'><i class="fa-brands fa-angellist"></i>Wellfound</span></a>
              </div>
      </footer>
      </div>
  )
}

export default LandingPage
