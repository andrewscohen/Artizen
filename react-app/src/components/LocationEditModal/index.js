import { useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { getCoords } from "../../services/maps";
import { updateLocation } from "../../store/locations";
import "./LocationEditModal.css";

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

const LocationEditModal = ({ location, userId, setUpdateContainer }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(location.title);
  const [editArtist, setEditArtist] = useState(location.artist);
  const [editDescription, setEditDescription] = useState(location.description);
  const [editStreetAddress, setEditStreetAddress] = useState(location.street_address);
  const [editCity, setEditCity] = useState(location.city);
  const [editState, setEditState] = useState(location.state);
  const [editZip, setEditZip] = useState(location.zip_code);
  const dispatch = useDispatch();

  // FUNCTIONS TO BE PASSED INTO RETURN

  // Passed to onClick to open location form modal
  const openModal = () => {
    setIsOpen(true);
  }

  // Passed to onClick to close location form modal
  const closeModal = () => {
    setIsOpen(false);
  }

  // Executed once form is submit.
  // Coerces regular address into geocoded values for Google Maps API
  // Sends Input information to updateLocation thunk in store
  // Returns Errors if any
  // Clears form by reseting local state variable
  const handleSubmit = async (e) => {
    e.preventDefault();
    const address = `${editStreetAddress} ${editCity} ${editState} ${editZip}`;
    const { lat, long } = await getCoords(address);

    await dispatch(
      updateLocation({
        id: location.id,
        user_id: userId,
        title: editTitle,
        artist: editArtist,
        street_address: editStreetAddress,
        city: editCity,
        state: editState,
        zip_code: editZip,
        description: editDescription,
        lat,
        long,
      })
    );
    await setUpdateContainer(prev => !prev);
    await setIsOpen(false);
  };

  return (
    <>
      <button className="edit-btn location-edit-btn" onClick={openModal}>
        <i className="far fa-edit"></i>
      </button>
      <Modal
        style={customStyles}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <button
          className="btn__x"
          onClick={closeModal}>
          <i className="fas fa-times" />
        </button>
        <div className="location-edit-form">
          <h1>Edit Location</h1>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="artist">Artist</label>
            <input
              type="text"
              name="artist"
              value={editArtist}
              onChange={e => setEditArtist(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              value={editDescription}
              onChange={e => setEditDescription(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="street-address">Street Address</label>
            <input
              type="text"
              name="street-address"
              value={editStreetAddress}
              onChange={e => setEditStreetAddress(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              value={editCity}
              onChange={e => setEditCity(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="state">State</label>
            <input
              type="text"
              name="state"
              value={editState}
              onChange={e => setEditState(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="zip-code">ZIP Code</label>
            <input
              type="text"
              name="zip-code"
              value={editZip}
              onChange={e => setEditZip(e.target.value)}
            />
          </div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </Modal>
    </>
  );
};

export default LocationEditModal;
