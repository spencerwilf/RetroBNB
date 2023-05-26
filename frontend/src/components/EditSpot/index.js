import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { editSpotThunk } from '../../store/spots';
import './EditSpot.css'


const EditSpot = ({spot}) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const {spotId} = useParams();

  const [country, setCountry] = useState(spot?.country);
  const [address, setAddress] = useState(spot?.address);
  const [city, setCity] = useState(spot?.city);
  const [state, setState] = useState(spot?.state);
  const [description, setDescription] = useState(spot?.description);
  const [name, setName] = useState(spot?.name);
  const [price, setPrice] = useState(spot?.price)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const user = useSelector(state => state.session.user)


  useEffect(() => {
    let errors = {};
    if (!country) errors.country = "Country is required"
    if (!address) errors.address = "Address is required"
    if (!city) errors.city = "City is required"
    if (!state) errors.state = "State is required"
    if (description?.length < 30) errors.description = "Description needs 30 or more characters";
    if (!name) errors.name = "Title is required"
    if (!price) errors.price = "Price is required"

    if (country.length > 254) errors.country = "Input cannot be more than 255 characters"
    if (address.length > 254) errors.address = "Input cannot be more than 255 characters"
    if (city.length > 254) errors.city = "Input cannot be more than 255 characters"
    if (state.length > 254) errors.state = "Input cannot be more than 255 characters"
    if (description?.length > 254) errors.description = "Input cannot be more than 255 characters";
    if (name.length > 254) errors.name = "Input cannot be more than 255 characters"
    if (price.length > 254) errors.price = "Input cannot be more than 255 characters"
    setErrors(errors)
  }, [country, address, city, state, description, name, price, spotId])


  const onSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (Object.values(errors).length > 0) return alert('Cannot submit')

    const newSpotInfo = {
        country,
        address,
        city,
        state,
        description,
        name,
        price,
    }

    if (newSpotInfo) {
       let spot = await dispatch(editSpotThunk(newSpotInfo, spotId));
       setHasSubmitted(false)
       history.push(`/spots/${spotId}`)
    }

    setCountry('')
    setCity('')
    setAddress('')
    setState('')
    setDescription('')
    setName('')
    setPrice('')
    setErrors({})
  }

  if (!user) history.push('/')

  if (!spot) return null

  return (
    <div className='user-spot-submission-form'>
      <h2>Update your Spot</h2>
      <h3>Where's your place located?</h3>
      <p>Guests will only get your exact address once they've booked a reservation.</p>
      <form className='new-spot-create-form' onSubmit={onSubmit}>
        <div>
          <label htmlFor='country'>Country</label>
          <input
            id='country'
            type='text'
            value={country}
            onChange={e => setCountry(e.target.value)}
          />
          {hasSubmitted && errors.country && (<p className='creation-errors'>{errors.country}</p>)}
        </div>
        <div>
          <label htmlFor='street-adress'>Street Address:</label>
          <input
            id='address'
            value={address}
            type='text'
            onChange={e => setAddress(e.target.value)}
          />
        {hasSubmitted && errors.address && (<p className='creation-errors'>{errors.address}</p>)}
        </div>
        <div>
          <label htmlFor='city'>City:</label>
          <input
            id='city'
            value={city}
            type='text'
            onChange={e => setCity(e.target.value)}
          />
          {hasSubmitted && errors.city && (<p className='creation-errors'>{errors.city}</p>)}
        </div>
        <div>
          <label htmlFor='state'>State:</label>
          <input
            id='state'
            value={state}
            type='text'
            onChange={e => setState(e.target.value)}
          />
          {hasSubmitted && errors.state && (<p className='creation-errors'>{errors.state}</p>)}
        </div>
        <div>
          <label htmlFor='latitude'>Latitude:</label>
          <input
            id='latitude'
            placeholder='Feature in progress'
            type='text'
            disabled={true}
          />
        </div>
        <div id='longitude-border-input'>
          <label htmlFor='longitude'>Longitude:</label>
          <input
            id='longitude'
            placeholder='Feature in progress'
            type='text'
            disabled={true}
          />
        </div>
        <h3>Describe your place to Guests</h3>
        <p>Mention the best features of your space!</p>
        <div>
  <label htmlFor='description'></label>
  <textarea
    id='create-spot-description'
    name='description'
    value={description}
    onChange={e => setDescription(e.target.value)}
  />
  {hasSubmitted && errors.description && (<p className='creation-errors'>{errors.description}</p>)}
</div>
<div className='update-bottom-form-items'>

    <h3>Create a title for your spot</h3>
    <p>Catch guests' attention with a title that highlights what makes your place special</p>
          <label htmlFor='name'>Name:</label>
          <input
            id='title'
            type='text'
            value={name}
            onChange={e => setName(e.target.value)}
          />
          {hasSubmitted && errors.name && (<p className='creation-errors'>{errors.name}</p>)}
        <div>
            <h3>Set a base price for your spot</h3>
            <p>Competitive pricing can help your listing stand out</p>
          <label htmlFor='price'>$</label>
          <input
            id='price'
            type='text'
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
          {hasSubmitted && errors.price && (<p className='creation-errors'>{errors.price}</p>)}
        </div>
        </div>
        <button className='reserve-button'>Update your Spot</button>
      </form>
    </div>
  )
}

export default EditSpot
