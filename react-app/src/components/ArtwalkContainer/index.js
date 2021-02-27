import Directions from '../RouteMap'
import "./ArtwalkContainer.css"

export default function ArtwalkContainer({artwalk}) {
  const locationsArray = Object.values(artwalk.locations)
  const coordinatesObj = locationsArray.map(location => {
    return {lat: location.lat, lng: location.long}
  })

  const coordinateArr = locationsArray.map(location => {
    return `${location.lat}, ${location.long}`
  })
  const waypointString = coordinateArr.slice(1, coordinateArr.length -1).join('|')
  const coordinateString = coordinateArr.join('|')
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${coordinateArr[0]}&destination=${coordinateArr[coordinateArr.length - 1]}&waypoints=${waypointString}&mode=walking&key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`
  console.log(url)
  const pathFunc = async () => {
    // const path = await fetch(url)
    // return path;
  }
  const mapContainerStyle = {
    height: "200px",
    width: "350px",
    borderRadius: "5px 0 0 5px",
  }

  if (locationsArray.length) {
    return (
    <div className="artwalk-container">
       {/* <img
          src={`https://maps.googleapis.com/maps/api/staticmap?size=350x200&maptype=roadmap&markers=color:0xFE3A9E%7C${coordinateString}&path=enc%3A${path}&key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`}
          alt="map"
        /> */}
      <Directions className="map" coordinates={coordinatesObj} mapContainerStyle={mapContainerStyle}/>
      <div className="artwalk-container__info">
        <h2>{artwalk.name}</h2>
        <h3>{locationsArray[0].city}, {locationsArray[0].state}</h3>
      </div>
    </div>
  )
}
}
