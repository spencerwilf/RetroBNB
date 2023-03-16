import React, { useEffect } from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
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
  const [previewImg, setPreviewImg] = useState('');
  const [img2, setImg2] = useState('')
  const [img3, setImg3] = useState('')
  const [img4, setImg4] = useState('')
  const [img5, setImg5] = useState('')
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const user = useSelector(state => state.session.user)

  if (!user) history.push('/')


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
        Owner: {id: user.id, firstName: user.firstName, lastName: user.lastName}
    }

    const images = [{url: previewImg, preview: true}]

    if (img2) images.push({url: img2, preview: false})
    if (img3) images.push({url: img3, preview: false})
    if (img4) images.push({url: img4, preview: false})
    if (img5) images.push({url: img5, preview: false})


    if (newSpotInfo) {
       let spot = await dispatch(addSpotThunk(newSpotInfo, images));
       history.push(`/spots/${spot.id}`)
    }

    setCountry('')
    setCity('')
    setAddress('')
    setState('')
    setDescription('')
    setName('')
    setPrice('')
    setPreviewImg('')
    setImg2('')
    setImg3('')
    setImg4('')
    setImg5('')
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
    if (!previewImg) errors.previewImg = 'Preview image is required'
    setErrors(errors)
  }, [country, address, city, state, description, previewImg, name, price])


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
            placeholder='Country'
            type='text'
            onChange={e => setCountry(e.target.value)}
            value={country}
          />
        </div>
        <div>
          <label htmlFor='street-adress'>Street Address:</label>
          <input
            id='address'
            placeholder='Address'
            type='text'
            onChange={e => setAddress(e.target.value)}
            value={address}
          />

        </div>
        <div>
          <label htmlFor='city'>City:</label>
          <input
            id='city'
            placeholder='City'
            type='text'
            onChange={e => setCity(e.target.value)}
            value={city}
          />
        </div>
        <div>
          <label htmlFor='state'>State:</label>
          <input
            id='state'
            placeholder='State'
            type='text'
            onChange={e => setState(e.target.value)}
            value={state}
          />
        </div>
        <div>
          <label htmlFor='latitude'>Latitude:</label>
          <input
            id='latitude'
            placeholder='Latitude'
            type='text'
            disabled={true}
          />
        </div>
        <div>
          <label htmlFor='Longitude'>Longitude:</label>
          <input
            id='longitude'
            placeholder='longitude'
            type='text'
            disabled={true}
          />
        </div>
        <h3>Describe your place to guests</h3>
        <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
        <div>
  <label htmlFor='description'></label>
  <textarea
    id='description'
    placeholder='Description (must be 30 or more characters)'
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
            placeholder='Name of your spot'
            type='text'
            onChange={e => setName(e.target.value)}
            value={name}
          />
        </div>
        <div>
            <h3>Set a base price for your spot</h3>
            <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
          <label htmlFor='price'>$</label>
          <input
            id='price'
            placeholder='Price per night (USD)'
            type='text'
            onChange={e => setPrice(e.target.value)}
            value={price}
          />
        </div>
        <div>
            <h3>Liven up your spot with photos</h3>
            <p>Submit a link to at least one photo to publish your spot</p>
          <label htmlFor='image'>Preview image:</label>
          <input
            placeholder='Preview Image URL'
            type='url'
            value={previewImg}
            onChange={e => setPreviewImg(e.target.value)}
          />
          <input
            placeholder='Image URL'
            type='url'
            onChange={e => setImg2(e.target.value)}
            value={img2}
          />
          <input
            placeholder='Image URL'
            type='url'
            value={img3}
            onChange={e => setImg3(e.target.value)}
          />
          <input
            placeholder='Image URL'
            type='url'
            value={img4}
            onChange={e => setImg4(e.target.value)}
          />
          <input
            placeholder='Image URL'
            type='url'
            value={img5}
            onChange={e => setImg5(e.target.value)}

          />

        </div>
        <button>Create Spot</button>
      </form>
    </div>
  );
}

export default CreateSpot
