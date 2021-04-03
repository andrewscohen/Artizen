import React from "react";
import "./artcard.css";

const ArtCard = ({location, artWalkList, setArtWalkList}) => {
    const deleteFromWalk = () => {
        const locationIndex = artWalkList.indexOf(location)
        artWalkList.splice(locationIndex, 1)
        setArtWalkList(artWalkList => [...artWalkList])
    }
return (
    <div className="artContainer">
            <div className="artContentContainer">
                <img
                    src={location.photos[0].url}
                    alt="locationImage"
                    className="locationImage"
                />
                <div className="artContentInfo">
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
        <button
            type="button"
            onClick={deleteFromWalk}
            className="trash"
        >
            <i className="fas fa-times" />
        </button>
    </div>
)
}

export default ArtCard;
