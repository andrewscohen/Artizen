import { Link } from "react-router-dom";
import "./DisplayWindow.css";

const DisplayWindow = ({ selected, setShowDisplayWindow, setSelected }) => {
  const handleDisplayWindowClose = () => {
    setShowDisplayWindow(false);
    setSelected(null);
  };

  return (
    <div className="map-display-window">
      <div className="map-display-btn-container">
        <button onClick={handleDisplayWindowClose}>
          <i className="fas fa-times"></i>
        </button>
      </div>
      <div className="map-display-img-container">
        <img src={selected.photos[0].url} />
      </div>
      <div className="map-display-text-container">
        <p>
          {selected.street_address}, {selected.city}, {selected.state} {selected.zip_code}
        </p>
      </div>
      <div className="map-display-link-container">
        <Link to={`/locations/${selected.id}`}>See Details</Link>
      </div>
    </div>
  );
};

export default DisplayWindow;
