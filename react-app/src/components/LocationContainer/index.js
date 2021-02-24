import { getLocation } from "../../store/locations";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const LocationContainer = () => {
  const dispatch = useDispatch();
  const { locationId } = useParams();
  const location = useSelector(state => state.locations);

  useEffect(() => {
    dispatch(getLocation(locationId));
  }, [dispatch, locationId]);

  return (
    <>
      <img style={{ maxWidth: "500px" }} src={location.photos[0].url} />
      <p>{location.artist}</p>
    </>
  );
};

export default LocationContainer;
