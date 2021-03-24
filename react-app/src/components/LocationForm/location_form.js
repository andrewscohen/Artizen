import React, {useState} from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import splashImage from "./expose-art-crop.jpg"
import LocationFormModal from "../LocationFormModal/location_form_modal";
import './location_form.css'

const LocationForm = () => {

  const newLocation = useSelector(state => state.locations.newLocation);
  const [showContainer, setShowContainer] = useState(true);
  const [backgroundStyle, setBackgroundStyle] = useState({backgroundColor: "rgba(0, 0, 0, 0.7)"})


  return (
    <>
        <>
        {newLocation && <Redirect to={`/locations/${newLocation.id}`} />}
        <div className="splash-container-loc vertical-center" style={backgroundStyle}>
        {showContainer &&
        <>
        <h1 className="heading1 header">Uncover Your City's True Colors</h1>
        <h2>Found some neat street art?</h2>
        </>
        }
          <LocationFormModal showContainer={showContainer} setShowContainer={setShowContainer} setBackgroundStyle={setBackgroundStyle}/>
        </div>
      <div className="main location_main">
        <img className="background__img" src={splashImage} alt="Uncovering Colorful Street Art"/>
      </div>
      </>
    </>
  );
};

export default LocationForm;
