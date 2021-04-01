import React from "react";
import {Link} from "react-router-dom";
import "./artcard.css";

const ArtCard = ({location, artWalkList, setArtWalkList}) => {
    const deleteFromWalk = () => {
        const locationIndex = artWalkList.indexOf(location)
        artWalkList.splice(locationIndex, 1)
        setArtWalkList(artWalkList => [...artWalkList])
    }
return (
    <div className="artContainer">
        {/* <Link to={`/locations/${location.id}`}> */}
            <div className="artContentContainer">
                <img
                    src={location.photos[0].url}
                    alt="locationImage"
                    className="locationImage"
                />
                <div className="artContentInfo">
                {/*     {location.title ? (
                        <p>{location.title}</p>)
                         : <p>Title Unknown</p>
                    }
                    {location.artist ? (
                        <p>{location.artist}</p>
                        ) : <p>Artist Unknown</p>
                    }
                </div> */}
                {location.title && <h2 className="header artlocation-title">{location.title}</h2>}
                {location.artist && <h3 className="header artlocation-artist">Artist: {location.artist}</h3>}
                <h3 className="artlocation-address">
                    {location.street_address}
                    <div>
                    {location.city}, {location.state}
                    </div>
                    {location.zip_code}
                </h3>
                </div>
            </div>
        {/* </Link> */}
​
        <button
            type="button"
            onClick={deleteFromWalk}
            // className="remove-btn"
            className="trash"
        >
            <i className="fas fa-times"></i>
        </button>
    </div>
)
}

export default ArtCard;
