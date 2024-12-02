const EventBody = ({ event }) => {
  const formatDate = (d) => {
    return new Date(d).toLocaleString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  return (
    <div className="card-body p-4">

      <div className="d-flex align-items-center my-2">
        <i className="bi bi-calendar3 pe-1"/>
        <p className="card-subtitle ms-2">{formatDate(event.datum)}</p>          
      </div>        

      <div className="d-flex align-items-center my-2">
        <i className="bi bi-geo-alt pe-1"/>
        <p className="card-subtitle ms-2">{event?.location}, {event?.stadt}</p>          
      </div>        

      <p className="fs-5 mb-3">Special Guests:</p>
      {event?.supportBands && event?.supportBands.map((band, index) => (
        <span
          key={index}
          className="badge border border-secondary text-dark m-2 px-3 py-2"
        >{band}
        </span>
      ))}
      <p className="fs-5 mb-3">Sonstige Infos:</p>
      
      <p>{event?.bemerkung}</p>

    </div>
  )
}

export default EventBody