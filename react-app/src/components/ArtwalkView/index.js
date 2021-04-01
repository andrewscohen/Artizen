import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Directions from "../RouteMap";
import * as artwalkActions from "../../store/artwalks";
import mapStyle from "../Maps/mapStyle";
import ArtLocationContainer from "../ArtLocationContainer";
import "./ArtwalkView.css";
import Footer from "../Footer";

export default function ArtwalkView() {
  const { artwalkId } = useParams();
  const dispatch = useDispatch();
  const showDelete = false;
  const locationsArray = useSelector(state => state.artwalks.currentArtwalk.locations);
  const currentArtwalk = useSelector(state => state.artwalks.currentArtwalk);

  useEffect(() => {
    dispatch(artwalkActions.getOneArtwalk(artwalkId));
  }, [dispatch, artwalkId]);

  const mapContainerStyle = {
    height: "375px",
    width: "100%",
  };

  const options = {
    styles: mapStyle,
    disableDefaultUI: true,
    zoomControl: false,
  };

  if (currentArtwalk && locationsArray) {
    return (
      <>
        {currentArtwalk && (
          <div className="main artwalk-main">
            <div className="artwalk-map">
              <Directions
                className="map"
                locationsArray={locationsArray}
                mapContainerStyle={mapContainerStyle}
                options={options}
              />
            </div>
            <div className="artwalkview-info">
              <h1 className="artwalkview-title">{currentArtwalk.name}</h1>
              <h2 className="artwalkview-city">
                {locationsArray[0].city}, {locationsArray[0].state}
              </h2>
            </div>
            <div className="locationsContainer">
              {locationsArray.map(location => {
                return <ArtLocationContainer showDelete={showDelete} location={location} />;
              })}
            </div>
          </div>
        )}
        <Footer bottomOfPage={true} />
      </>
    );
  }
  return <span>Loading</span>;
}
