import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router';
import EditSpot from '.';
import { fetchSpotsThunk } from '../../store/spots';

const EditSpotWrapper = () => {

    const dispatch = useDispatch();
    const {spotId} = useParams();
    const spotGroup = useSelector(state => state.spots.allSpots)

    const spot = spotGroup[spotId]

    useEffect(() => {
        dispatch(fetchSpotsThunk())
    }, [dispatch])


    if (!spot) {
        return null;
    } else {
        return (<EditSpot spot={spot}/>);
    }
}

export default EditSpotWrapper
