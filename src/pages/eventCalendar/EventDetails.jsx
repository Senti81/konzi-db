import { Link, useLocation } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

const EventDetails = () => {
  const location = useLocation()
  const event = location.state?.event

  const { user } = useAuth()

  const formatDate = (d) => {
    return new Date(d).toLocaleString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })
  }
  
  return (
    <div className="container">
      
      <div className="card w-auto w-md-100 shadow">
        <div className="card-header">
          <h4 className="card-title display-6 text-center">{event?.band}</h4>
        </div>
        <div className="card-body p-4">

          <div className="d-flex align-items-center my-2">
           <i className="bi bi-calendar3 pe-1"/>
            <p className="card-subtitle ms-2">{formatDate(event.datum)}</p>          
          </div>        

          <div className="d-flex align-items-center my-2">
            <i className="bi bi-geo-alt pe-1"/>
            <p className="card-subtitle ms-2">{event?.location}, {event?.stadt}</p>          
          </div>        

          <h5 className="fs-5 my-3">Special Guests:</h5>
          {event?.supportBands && event?.supportBands.map((band, index) => (
            <span
              key={index}
              className="badge border border-secondary text-dark m-2 px-3 py-2"
            >{band}
            </span>
          ))}
          <h5 className="card-title my-3">Sonstige Infos:</h5>
          <p>{event?.bemerkung}</p>
        </div>

        <div className="card-footer text-body-secondary d-flex justify-content-between">
          { user?.uid === event?.userId &&
            <Link
              to={`/events/${event.id}/edit`}
              state={{ event }}
              className="btn btn-outline-secondary"
              >
                  <i className="bi bi-pencil me-2"></i>

              Bearbeiten
            </Link>
          }
          <Link to={'..'} relative="path" className="btn btn-primary">
            <i className="bi bi-arrow-counterclockwise me-2"></i>
            Zurück
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EventDetails