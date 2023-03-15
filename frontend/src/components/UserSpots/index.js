import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import UserSpotCard from '../UserSpotCard'
import { getUserSpotsThunk } from '../../store/spots'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'

const UserSpots = () => {

const dispatch = useDispatch();
const history = useHistory();


const spots = useSelector(state => state.spots.userSpots)
const user = useSelector(state => state.session.user)

if (!user) history.push('/');

let spotsArr;

if (spots) {
    spotsArr = Object.values(spots)
}


useEffect(() => {
    dispatch(getUserSpotsThunk())
}, [dispatch, spotsArr.length])

if (!spotsArr) return null;

  return (
    <div>
        <h1>Manage Spots</h1>

            <button>
                <Link exact='true' to='/spots/new'>
                <div>Create a New Spot</div>
                </Link>
            </button>
            <div className='user-spots-holder'>
                {spotsArr &&
                spotsArr.map(spot => <UserSpotCard key={spot.id} spot={spot}/>)}
            </div>
    </div>
  )
}

export default UserSpots
