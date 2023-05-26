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

      <h2 style={{ textAlign: 'center' }}>Edit Spot</h2>

      <div id='create-spot-page-wrapper'>

        <form className='new-spot-create-form' onSubmit={onSubmit}>
          <div>
            <h3>Where's your place located?</h3>
            <p style={{ marginBottom: '2rem' }}>Guests will only get your exact address once they've booked a reservation.</p>
            <div>
              <label htmlFor='country'>Country</label>
              <input
                id='country'
                className='create-spot-form-field'
                placeholder='Country'
                type='text'
                onChange={e => setCountry(e.target.value)}
                value={country}
              />
              {hasSubmitted && errors.country && (<p className='creation-errors'>{errors.country}</p>)}
            </div>
            <div>
              <label htmlFor='street-adress'>Street Address</label>
              <input
                id='address'
                className='create-spot-form-field'
                placeholder='Address'
                type='text'
                onChange={e => setAddress(e.target.value)}
                value={address}
              />
              {hasSubmitted && errors.address && (<p className='creation-errors'>{errors.address}</p>)}
            </div>
            <div>
              <label htmlFor='city'>City</label>
              <input
                id='city'
                className='create-spot-form-field'
                placeholder='City'
                type='text'
                onChange={e => setCity(e.target.value)}
                value={city}
              />
              {hasSubmitted && errors.city && (<p className='creation-errors'>{errors.city}</p>)}
            </div>
            <div>
              <label htmlFor='state'>State</label>
              <input
                id='state'
                className='create-spot-form-field'
                placeholder='State'
                type='text'
                onChange={e => setState(e.target.value)}
                value={state}
              />
              {hasSubmitted && errors.state && (<p className='creation-errors'>{errors.state}</p>)}
            </div>
            <div>
              <label htmlFor='latitude'>Latitude</label>
              <input
                id='latitude'
                className='create-spot-form-field'
                placeholder='Latitude (feature in progress)'
                type='text'
                disabled={true}
              />
            </div>
            <div id='longitude-border-input'>
              <label htmlFor='Longitude'>Longitude</label>
              <input
                id='longitude'
                className='create-spot-form-field'
                placeholder='Longitude (feature in progress)'
                type='text'
                disabled={true}
              />
            </div>
          </div>

          <div style={{ borderBottom: '1px solid #DDDDDD', padding: '1rem 0' }}>
            <h3>Describe your place to guests</h3>
            <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
            <div>
              <label htmlFor='description'></label>
              <textarea
                id='create-spot-description'
                className='create-spot-form-field'
                placeholder='Description (must be 30 or more characters)'
                name='description'
                onChange={e => setDescription(e.target.value)}
                value={description}
              />
              {hasSubmitted && errors.description && (<p className='creation-errors'>{errors.description}</p>)}
            </div>
          </div>
          <div style={{ borderBottom: '1px solid #DDDDDD', padding: '1rem 0' }}>
            <h3>Create a title for your spot</h3>
            <p>Catch guests' attention with a title that highlights what makes your place special.</p>
            <input
              id='title'
              className='create-spot-form-field'
              placeholder='Name of your spot'
              type='text'
              onChange={e => setName(e.target.value)}
              value={name}
            />
            {hasSubmitted && errors.name && (<p className='creation-errors'>{errors.name}</p>)}
          </div>
          <div style={{ marginBottom:'2rem', padding: '1rem 0' }}>
            <h3>Set a base price for your spot</h3>
            <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
            <input
              id='price'
              className='create-spot-form-field'
              placeholder='Price per night (USD)'
              type='text'
              onChange={e => setPrice(e.target.value)}
              value={price}
            />
            {hasSubmitted && errors.price && (<p className='creation-errors'>{errors.price}</p>)}
          </div>
          
          <button className='reserve-button'>Update</button>
        </form>
      </div>
    </div>
  );
}

export default EditSpot
