import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as locationActions from "../../store/locations";
import { getCoords } from "../../services/maps";

const LocationForm = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [street_address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip_code, setZip] = useState(0);
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [errors, setErrors] = useState([]);

  const sessionUser = useSelector(state => state.session.user);
  const newLocation = useSelector(state => state.locations.location);

  const dispatch = useDispatch();
  //   const history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();
    let newErrors = [];
    const address = `${street_address} ${city} ${state} ${zip_code}`;
    console.log("ADDRESS: ", address);
    const { lat, long } = await getCoords(address);
    dispatch(
      locationActions.addLocation({
        user_id: sessionUser.id,
        street_address,
        city,
        state,
        zip_code,
        title,
        description,
        artist,
        lat,
        long,
        photo,
      })
    )
      .then(() => {
        setTitle("");
        setArtist("");
        setAddress("");
        setCity("");
        setState("");
        setZip(0);
        setDescription("");
        setPhoto("");
      })
      .catch(res => {
        if (res.data && res.data.errors) {
          newErrors = res.data.errors;
          setErrors(newErrors);
        }
      });
  };

  return (
    <>
      {newLocation && <Redirect to={`/locations/${newLocation.id}`} />}
      <h1>Enter a New Location</h1>
      <fieldset>
        {errors.length > 0 && errors.map(error => <div key={error}>{error}</div>)}
        <form onSubmit={handleSubmit}>
          <label>
            <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
          </label>
          <label>
            <input type="text" placeholder="Artist" value={artist} onChange={e => setArtist(e.target.value)} />
          </label>
          <label>
            <input
              type="text"
              placeholder="Street Address"
              value={street_address}
              onChange={e => setAddress(e.target.value)}
            />
          </label>
          <label>
            <input type="text" placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
          </label>
          <label>
            <input type="text" placeholder="State" value={state} onChange={e => setState(e.target.value)} />
          </label>
          <label>
            <input type="number" placeholder="Zip Code" value={zip_code} onChange={e => setZip(e.target.value)} />
          </label>
          <label>
            <input
              type="textarea"
              placeholder="Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </label>
          <label>
            <input type="file" onChange={e => setPhoto(e.target.files[0])} />
          </label>

          <label>
            <button type="submit">Create Location</button>
          </label>
        </form>
      </fieldset>
    </>
  );
};

export default LocationForm;
