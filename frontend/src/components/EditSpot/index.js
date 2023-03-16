import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { editSpotThunk } from '../../store/spots';


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

  if (!user) history.push('/')

  useEffect(() => {
    let errors = {};
    if (!country) errors.country = "Country is required"
    if (!address) errors.address = "Address is required"
    if (!city) errors.city = "City is required"
    if (!state) errors.state = "State is required"
    if (description?.length < 30) errors.description = "Description needs 30 or more characters";
    if (!name) errors.name = "Title is required"
    if (!price) errors.price = "Price is required"
    setErrors(errors)
  }, [country, address, city, state, description, name, price])


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
       history.push(`/spots/${spot.id}`)
    }

    setCountry('')
    setCity('')
    setAddress('')
    setState('')
    setDescription('')
    setName('')
    setPrice('')
    setHasSubmitted(false)
    setErrors({})
  }

  if (!spot) return null

  return (
    <div className='user-spot-submission-form'>
      <h2>Update your Spot</h2>
      {hasSubmitted && Object.values(errors).length > 0 && (
        <div>
            The following errors were found in your submission:
            <ul>
                {Object.values(errors).map(error => (
                    <li key={error}>{error}</li>
                ))}
            </ul>
        </div>
      )}
      <h3>Where's your place located?</h3>
      <p>Guests will only get your exact address once they've booked a reservation.</p>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor='country'>Country</label>
          <input
            id='country'
            type='text'
            onChange={e => setCountry(e.target.value)}
            value={country}
          />
        </div>
        <div>
          <label htmlFor='street-adress'>Street Address:</label>
          <input
            id='address'
            type='text'
            onChange={e => setAddress(e.target.value)}
            value={address}
          />

        </div>
        <div>
          <label htmlFor='city'>City:</label>
          <input
            id='city'
            type='text'
            onChange={e => setCity(e.target.value)}
            value={city}
          />
        </div>
        <div>
          <label htmlFor='state'>State:</label>
          <input
            id='state'
            type='text'
            onChange={e => setState(e.target.value)}
            value={state}
          />
        </div>
        <div>
          <label htmlFor='latitude'>Latitude:</label>
          <input
            id='latitude'
            type='text'
            disabled={true}
          />
        </div>
        <div>
          <label htmlFor='longitude'>Longitude:</label>
          <input
            id='longitude'
            type='text'
            disabled={true}
          />
        </div>
        <h3>Describe your place to Guests</h3>
        <p>Mention the best features of your space!</p>
        <div>
  <label htmlFor='description'></label>
  <textarea
    id='description'
    name='description'
    onChange={e => setDescription(e.target.value)}
            value={description}
  />
</div>
<div>
    <h3>Create a title for your spot</h3>
    <p>Catch guests' attention with a title that highlights what makes your place special</p>
          <label htmlFor='name'>name:</label>
          <input
            id='title'
            type='text'
            onChange={e => setName(e.target.value)}
            value={name}
          />
        </div>
        <div>
            <h3>Set a base price for your spot</h3>
            <p>Competitive pricing can help your listing stand out</p>
          <label htmlFor='price'>$</label>
          <input
            id='price'
            type='text'
            onChange={e => setPrice(e.target.value)}
            value={price}
          />
        </div>
        <button>Update your Spot</button>
      </form>
    </div>
  )
}

export default EditSpot
