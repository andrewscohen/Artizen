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
        <p>{selected !== null && selected.street_address}</p>
      </div>
    </div>
  );
};

export default DisplayWindow;
