import React, { useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import * as locationActions from "../../store/locations";
import { getCoords } from "../../services/maps";
import "./LocationFormModal.css";


// Modal Styling
const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        padding: "1.5em",
        backgroundColor: "rgba(254, 58, 158, .7)",
        borderRadius: "2px",
        border: "none",
        width: "fit-content",
        boxSizing: "border-box",
        fontFamily: `"Ubuntu", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif`,
    },
    overlay: {
        // backgroundColor: "transparent",
        backgroundColor: "rgba(0, 0, 0, .6)",
        zIndex: "100",
    },
    };

const LocationFormModal = ({showContainer, setShowContainer, setBackgroundStyle}) => {

  // State variables
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [street_address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip_code, setZip] = useState('');
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [errors, setErrors] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  // Hook Variable Assignments
  const dispatch = useDispatch();

  // State Info
  const sessionUser = useSelector(state => state.session.user);


  // FUNCTIONS TO BE PASSED INTO RETURN

  // Passed to onClick to open location form modal
  const openModal = () => {
    setIsOpen(true);
    setShowContainer(false);
    setBackgroundStyle({backgroundColor: "rgba(0, 0, 0, 0.0)"})
  }

  // Passed to onClick to close location form modal
  const closeModal = () => {
    setIsOpen(false);
    setShowContainer(true);
    setBackgroundStyle({backgroundColor: "rgba(0, 0, 0, 0.7)"})
  }

  // Executed once form is submit.
  // Coerces regular address into geocoded values for Google Maps API
  // Sends Input information to addLocation thunk in store
  // Returns Errors if any
  // Clears form by reseting local state variable
  const handleSubmit = async e => {
    e.preventDefault();
    let newErrors = [];
    const address = `${street_address} ${city} ${state} ${zip_code}`;
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
        setZip('');
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
      <div className="modal-container">
        {showContainer && (
          <button
            className="login-btn"
            onClick={openModal}>
            Upload It Here
          </button>
        )}
        <Modal
          style={customStyles}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
            >
          <button className="btn__x" onClick={closeModal}>
            <i className="fas fa-times" />
          </button>
          <div className="new-location-form">
            <h1>Add Location</h1>
              {errors.length > 0 && errors.map(error => <div className="errors" key={error}>{error}</div>)}
            <form onSubmit={handleSubmit}>
              <div>
                <label>Artwork Title</label>
                <input
                  type="text"
                  placeholder="Title (optional)"
                  value={title}
                  onChange={e => setTitle(e.target.value)} />
              </div>
              <div>
                <label>Artist Name</label>
                <input
                  type="text"
                  placeholder="Artist (optional)"
                  value={artist}
                  onChange={e => setArtist(e.target.value)}
                />
              </div>
              <div>
                <label>Street Address</label>
                <input
                  type="text"
                  placeholder="Street Address"
                  value={street_address}
                  onChange={e => setAddress(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>City</label>
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>State</label>
                <input
                  type="text"
                  placeholder="State"
                  value={state}
                  onChange={e => setState(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Zip Code</label>
                <input
                  type="number"
                  placeholder="Zip Code"
                  value={zip_code}
                  onChange={e => setZip(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Description</label>
                <input
                  type="textarea"
                  placeholder="Description (optional)"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>
              <div>
                <label>Upload A Photo </label>
                <input
                  type="file"
                  onChange={e => setPhoto(e.target.files[0])}
                  required
                />
              </div>
              <div>
                <button type="submit">Create Location</button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default LocationFormModal;
