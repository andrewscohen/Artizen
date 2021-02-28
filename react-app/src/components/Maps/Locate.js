import "./Map.css";

const Locate = ({ panTo }) => {
  return (
    <button
      className="locate map-compass-btn"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          position => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <i class="fas fa-crosshairs"></i>
    </button>
  );
};

export default Locate;
