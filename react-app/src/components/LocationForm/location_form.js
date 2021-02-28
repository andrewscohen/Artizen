import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import splashImage from "./expose-art-crop.jpg"
import LocationFormModal from "../LocationFormModal/location_form_modal";
import './location_form.css'

const LocationForm = () => {

  const newLocation = useSelector(state => state.locations.location);
  
  return (
    <>
      {newLocation && <Redirect to={`/locations/${newLocation.id}`} />}
      <div className="splash-container-loc">
        <h1 className="heading1">Uncover Your City's True Colors</h1>
        <h2>Found some neat street art?</h2>
        <LocationFormModal />
      </div>
      <img className="header__img" src={splashImage} alt="Uncovering Colorful Street Art"/>
    </>
  );
};

export default LocationForm;
