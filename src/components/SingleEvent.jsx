import { Link } from "react-router-dom"
import festival from '../icons/festival.png'
import konzert from '../icons/konzert.png'

const SingleEvent = ({ event }) => {

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
      <Link
        to={`/events/${event.id}`}
        className="list-group-item list-group-item-action d-flex gap-3 py-3"            
        state={{ event }}
      >
      <img src={event.typ === 'Festival' ? festival : konzert} alt="twbs" width="40px" height="40px" className="rounded-circle flex-shrink-0" />
      <div className="d-flex gap-2 w-100 justify-content-between">
        <div>
          <h6 className="mb-0">{event.band}</h6>
          <p className="mb-0 opacity-75">
            <i className="bi bi-globe-americas pe-1"></i>
              <small>{event.stadt}</small>
            <i className="bi bi-geo-alt ms-3 pe-1"></i>
            <small>{event.location}</small>
          </p>
        </div>
        <small className="opacity-50 text-nowrap">{formatDate(event.datum)}</small>
      </div>
    </Link>
  )
}

export default SingleEvent