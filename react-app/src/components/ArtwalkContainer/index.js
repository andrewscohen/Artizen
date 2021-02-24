import * as mapsMethods from "../../services/maps"
import "./ArtwalkContainer.css"

export default function ArtwalkContainer({artwalk}) {
  const locationsArray = Object.values(artwalk.locations)

  return (
    <>
    <h3>{artwalk.name}</h3>
    <ul>
    {locationsArray.map(location => {
      return (
        <div>
          <div>
          {location.city}, {location.state}
          </div>
        </div>
        )
      })
    }
    </ul>
    </>
  )
}
