import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router';
import EditSpot from '.';
import { loadOneSpotThunk } from '../../store/spots';

const EditSpotWrapper = () => {

    const dispatch = useDispatch();
    const {spotId} = useParams();
    const spot = useSelector(state => state.spots.singleSpot)


    useEffect(() => {
        dispatch(loadOneSpotThunk(spotId))
    }, [dispatch, spotId])



    if (!spot) {
        return null;
    } else {
        return (
            <EditSpot spot={spot}/>
          )
    }
}

export default EditSpotWrapper
