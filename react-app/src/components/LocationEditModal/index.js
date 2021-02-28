import { useState } from "react";
import Modal from "react-modal";

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

const LocationEditModal = ({ location }) => {
  const [showModal, setShowModal] = useState(false);
  const [editTitle, setEditTitle] = useState(location.title);
  const [editArtist, setEditArtist] = useState(location.artist);
  const [editDescription, setEditDescription] = useState(location.description);
  const [editStreetAddress, setEditStreetAddress] = useState(location.street_address);
  const [editCity, setEditCity] = useState(location.city);
  const [editState, setEditState] = useState(location.state);
  const [editZip, setEditZip] = useState(location.zip_code);

  return (
    <>
      <button className="location-edit-btn" onClick={() => setShowModal(true)}>
        Edit Location
      </button>
      <Modal style={customStyles} isOpen={showModal}>
        <button className="btn__x" onClick={() => setShowModal(false)}>
          <i className="fas fa-times"></i>
        </button>
        <form className="location-edit-form">
          <h1>Edit Location</h1>
          <div>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" value={editTitle} onChange={e => setEditTitle(e.target.value)} />
          </div>
          <div>
            <label htmlFor="artist">Artist</label>
            <input type="text" name="artist" value={editArtist} onChange={e => setEditArtist(e.target.value)} />
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
            <input type="text" name="city" value={editCity} onChange={e => setEditCity(e.target.value)} />
          </div>
          <div>
            <label htmlFor="state">State</label>
            <input type="text" name="state" value={editState} onChange={e => setEditState(e.target.value)} />
          </div>
          <div>
            <label htmlFor="zip-code">ZIP Code</label>
            <input type="text" name="zip-code" value={editZip} onChange={e => setEditZip(e.target.value)} />
          </div>
          <button type="submit">Submit</button>
        </form>
      </Modal>
    </>
  );
};

export default LocationEditModal;
