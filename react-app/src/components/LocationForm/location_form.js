import React, { useState } from 'react';


function LocationForm(){

    const [title, setTitle] = useState('')
    const [artist, setArtist] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zip, setZip] = useState(null)
    const [description, setDescription] = useState('')
    const [photo, setPhoto] = useState(null)
    const [errors, setErrors] = useState([])

    return (
    <>
        <h1>Enter a New Location</h1>
        <fieldset>
            <form action="/locations/new" method="POST" enctype="multipart/form-data">
                <label>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <label>
                    <input
                        type="text"
                        placeholder="Artist"
                        value={artist}
                        onChange={(e) => setArtist(e.target.value)}
                    />
                </label>
                <label>
                    <input
                        type="text"
                        placeholder="Street Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </label>
                <label>
                    <input
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </label>
                <label>
                    <input
                        type="text"
                        placeholder="State"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                </label>
                <label>
                    <input
                        type="number"
                        placeholder="Zip Code"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                    />
                </label>
                <label>
                    <input
                        type="textarea"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <label>
                    <input type="file"  onChange={e => setPhoto(e.target.files[0])} />
                </label>
                <label>
                    <button type="submit">Create Location</button>
                </label>
            </form>
        </fieldset>
    </>
    )
}

export default LocationForm