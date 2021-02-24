import "./ArtwalkContainer.css"

export default function ArtwalkContainer({artwalk}) {
  const locationsArray = Object.values(artwalk.locations)

  return (
    <>
    <h3>{artwalk.name}</h3>
    <ul>
    {locationsArray.map(location => {
      return (
        <li>
          {location.street_address} {location.city} {location.state} {location.zip_code}
        </li>
        )
      })
    }
    </ul>
    </>
  )
}
