import React from "react";
import {Link} from "react-router-dom";
import "./artcard.css";

const ArtCard = ({location}) => {
return (
    <div className="artContainer">
        <Link to={`/locations/${location.id}`}>
            <div className="artContentContainer">
                    <img src={location.photos[0].url} alt="locationImage" className="locationImage"/>
                <div className="artContentInfo">
                    {location.title ? (
                    <p>{location.title}</p>
                    ) : <p>Title Unknown</p>}
                    {location.artist ? (
                    <p>{location.artist}</p>
                    ) : <p>Artist Unknown</p>}
                </div>
                <div className="artContentAddress">
                    <p>{location.street_address}</p>
                    <p>{location.city}, {location.state} {location.zip_code}</p>
                </div>
            </div>
        </Link>
​
        <button className="remove-btn">
            <i className="fas fa-times"></i>
        </button>
    </div>
)
}

export default ArtCard;
