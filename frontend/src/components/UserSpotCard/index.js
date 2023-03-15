import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem'
import DeleteSpotModal from '../DeleteSpotModal'
import { useDispatch } from 'react-redux'
import { getUserSpotsThunk } from '../../store/spots'

const UserSpotCard = ({ spot }) => {

    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

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

  return (
<>

<div className='user-card-container'>

<Link exact='true' to={`/spots/${spot.id}`}>
            <div className='user-image-container'>
            <img src={spot.previewImage}/>
            </div>

            <div className='first-line'>
                {spot.name}
                {`${spot.city}, ${spot.state}`}
            </div>

            <span className='review-span'>
            {spot.avgRating === "No ratings yet." ? <span><i className="fa-solid fa-star"></i> New! </span>: (
            <>
            <i className="fa-solid fa-star"></i>
            {spot.avgRating}
            </>
                          )}
                </span>
            <div className='second-line'>
                {`$${spot.price} night`}
            </div>
            </Link>
            <button>
        <Link exact='true' to={`/spots/${spot.id}/edit`} spot={spot}>
            Update
        </Link>
            </button>

            <button>
        <OpenModalMenuItem
        itemText='Delete'
        onItemClick={closeMenu}
        modalComponent={<DeleteSpotModal spotId = {spot.id}/>} />
    </button>

</div>


</>
  )
}

export default UserSpotCard
