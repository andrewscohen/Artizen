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
          {location.street_address}
          </div>
          <div>
          {location.city}, {location.state} {location.zip_code}
          </div>
        </div>
        )
      })
    }
    </ul>
    </>
  )
}
