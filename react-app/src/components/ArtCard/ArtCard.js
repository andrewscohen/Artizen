import React from "react";
import {Link} from "react-router-dom";
import "./artcard.css";

const ArtCard = ({location}) => {
return (
    <div className="artContainer">
        <Link to={`/locations/${location.id}`}>
            <div className="artContentContainer">
                <div className="artImage">
                    <img style={{height: '100px', width: '100px'}} src={location.photos[0].url} alt="locationImage"/>
                </div>
                <div className="artContentInfo">
                    {location.title ? (
                    <h1>{location.title}</h1>
                    ) : <h1>Title Unknown</h1>}
                    {location.artist ? (
                    <h2>{location.artist}</h2>
                    ) : <h2>Artist Unknown</h2>}
                </div>
                <div className="artContentAddress">
                    <p>{location.street_address}</p>
                    <p>{location.city}</p>
                    <p>{location.state}</p>
                    <p>{location.zip_code}</p>
                </div>tentCo
            </div>
        </Link>

        <button className="remove-btn">
            <i className="fas fa-times"></i>
        </button>
    </div>
)
}

export default ArtCard;
