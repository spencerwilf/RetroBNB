import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem'
import { useModal } from '../../context/Modal'
import DeleteSpotModal from '../DeleteSpotModal'
import { useDispatch } from 'react-redux'
import { getUserSpotsThunk } from '../../store/spots'
import './UserSpotCard.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'


const UserSpotCard = ({ spot }) => {

    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const history = useHistory()
    const {setModalContent} = useModal()

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false)
            }
        }
        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu)
    }, [showMenu])

    const closeMenu = () => setShowMenu(false)


    useEffect(() => {
        dispatch(getUserSpotsThunk())
    }, [dispatch])


    const editRedirect = () => {
        history.push(`/spots/${spot.id}/edit`)
    }


    const setDelete = () => {
        setModalContent(<DeleteSpotModal/>)
    }

  return (


<div className='user-card-container'>


    <div className='user-image-container'>
    <img id='user-spot-manage-img' src={spot.previewImage} alt=''/>
    </div>


    <div className='user-spot-bottom-card-info'>
    <div className='user-spot-info-2'>
    <div className='first-line'>
    
    <span style={{fontWeight:'600'}}>{`${spot.city}, ${spot.state}`}</span>
    <span className='user-spot-info-name-span'>{spot.name}</span>
                
    </div>
                  <div className='second-line-price'>
                      {`$${spot.price} night`}
                  </div>
              </div>

              <span className='review-span'>
                  {spot.avgRating === "No ratings yet." ? <span><i className="fa-solid fa-star"></i> New! </span> : (
                      <>
                          <i className="fa-solid fa-star"></i>
                          {spot.avgRating}
                      </>
                  )}
              </span>
    </div>


            


            <div className='user-page-button-div'>
            <button onClick={editRedirect} className='user-page-update-button'>

            Edit Spot

            </button>

            <button onClick={setDelete} className='user-page-delete-button'>Delete Spot</button>
    </div>
</div>



  )
}

export default UserSpotCard
