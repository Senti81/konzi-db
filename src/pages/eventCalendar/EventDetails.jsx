import { Link, useLocation } from "react-router-dom"

const EventDetails = () => {
  const location = useLocation()
  const event = location.state?.event
  
  return (
    <div className="container">

      {/* Draft Banner */}
      <div className="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Hinweis!</strong> Die Seite ist noch im Entwurfsstatus. Fehler können passieren 🤣
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      
      <div className="card w-auto w-md-100">
        <h4 className="card-header py-3">{event?.typ}: {event?.band}</h4>
        <div className="card-body p-4">
          <h5 className="card-title">Datum: {event?.datum}</h5>
          <p className="card-subtitle text-muted">{event?.stadt}</p>
          <p className="card-subtitle text-muted">{event?.location}</p>

          <h5 className="card-title my-3">Special Guests:</h5>
          {event?.supportBands && event?.supportBands.map((band, index) => (
            <span
              key={index}
              className="badge rounded-pill bg-info-subtle text-primary-emphasis m-1 px-3 py-2 fs-6"
            >{band}
            </span>
          ))}
          <h5 className="card-title my-3">Sonstige Infos:</h5>
          <p>{event?.bemerkung}</p>
        </div>

        <div className="card-footer text-body-secondary d-flex justify-content-between">
          <Link
            to={`/events/${event.id}/edit`}
            state={{ event }}
            className="btn btn-warning"
            >
            Bearbeiten
          </Link>
          <Link to={'..'} relative="path" className="btn btn-outline-secondary">Zurück</Link>
        </div>
      </div>
    </div>
  )
}

export default EventDetails