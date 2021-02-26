import Directions from '../RouteMap'
import "./ArtwalkContainer.css"

export default function ArtwalkContainer({artwalk}) {
  const locationsArray = Object.values(artwalk.locations)
  const coordinates = locationsArray.map(location => {
    return {lat: location.lat, lng: location.long}
  })

  if (locationsArray.length) {
    return (
    <div className="artwalk-container">
      <Directions className="map" coordinates={coordinates}/>
      <div className="artwalk-container__info">
        <h2>{artwalk.name}</h2>
        <h3>{locationsArray[0].city}, {locationsArray[0].state}</h3>
      </div>
    </div>
  )
}
}
