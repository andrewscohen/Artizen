
import "./ArtwalkContainer.css"

export default function ArtwalkContainer({artwalk}) {
  const locationsArray = Object.values(artwalk.locations)
  const coordinates = locationsArray.map(location => `${location.lat}, ${location.long}`)

  if (locationsArray.length) {
    return (
    <>
    <h3>{artwalk.name}</h3>
    <ul>
    {locationsArray.map(location => {
      return (
        <div>
          <div>
          {location.toString()}
          </div>
        </div>
        )
      })
    }
    </ul>
    </>
  )
}
}
