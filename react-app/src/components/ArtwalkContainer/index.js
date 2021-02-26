import Directions from '../RouteMap'
import "./ArtwalkContainer.css"

export default function ArtwalkContainer({artwalk}) {
  const locationsArray = Object.values(artwalk.locations)
  const coordinates = locationsArray.map(location => {
    return {lat: location.lat, lng: location.long}
  })

  if (locationsArray.length) {
    return (
    <>
    <h2>{artwalk.name}</h2>
    <h3>{locationsArray[0].city}, {locationsArray[0].state}</h3>
    <Directions coordinates={coordinates}/>
    </>
  )
}
}
