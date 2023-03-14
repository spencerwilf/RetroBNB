import React, { useEffect } from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { addSpotThunk } from '../../store/spots';

const CreateSpot = () => {

  const history = useHistory();
  const dispatch = useDispatch();

  const [country,setCountry] = useState('');
  const [address,setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('')
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [photo, setPhoto] = useState('')
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

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
        price
    }

    if (newSpotInfo) {
       let spot = await dispatch(addSpotThunk(newSpotInfo));
       history.push(`/spots/${spot.id}`)
    }

    setCountry('')
    setCity('')
    setAddress('')
    setState('')
    setDescription('')
    setName('')
    setPrice('')
    setPhoto('')
    setHasSubmitted(false)
    setErrors({})
  }

  useEffect(() => {
    let errors = {};
    if(!country) errors.country = "Country is required"
    if (!address) errors.address = "Address is required"
    if (!city) errors.city = "City is required"
    if (!state) errors.state = "State is required"
    if (description.length < 30) errors.description = "Description needs 30 or more characters";
    if (!name) errors.name = "Title is required"
    if (!price) errors.price = "Price is required"
    setErrors(errors)
  }, [country, address, city, state, description, name, price])


  return (

    <div className='user-spot-submission-form'>
      <h2>List your spot!</h2>
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
        <div>
            <h3>Liven up your spot with photos</h3>
            <p>Submit a link to at least one photo to publish our spot</p>
          <label htmlFor='image'>Preview image:</label>
          <input
            id='previewImage'
            type='text'
            onChange={e => setPhoto(e.target.value)}
            value={photo}
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default CreateSpot
