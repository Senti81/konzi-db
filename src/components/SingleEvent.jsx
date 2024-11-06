import { Link } from "react-router-dom"
import festival from '../icons/festival.png'
import konzert from '../icons/konzert.png'

const SingleEvent = ({ event }) => {

  const formatDate = (d) => {
    return new Date(d).toLocaleDateString('de-DE', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <Link
      to={`/events/${event.id}`}
      className="list-group-item list-group-item-action d-flex gap-1 py-2 align-items-center"            
      state={{ event }}
    >
      <img
        src={event.typ === 'Festival' ? festival : konzert}
        alt="Helgaaaa" 
        width="32px" 
        height="32px" 
        className="rounded-2 flex-shrink-0 me-2"
      />
      <div className="d-flex gap-2 w-100 justify-content-between">
        <div>
          <h6 className="mb-0">{event.band}</h6>
          <p className="mb-0 opacity-75">
            <i className="bi bi-geo-alt pe-1"></i>
            <small>{event.stadt} / {event.location}</small>
          </p>
        </div>
        <span className="badge bg-primary text-light text-nowrap align-self-center">
        {formatDate(event.datum)}      
          </span>
      </div>
    </Link>
  )
}

export default SingleEvent