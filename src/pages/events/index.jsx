import { useEffect, useState } from "react"
import useEvents from "../../hooks/useEvents"
import useAuth from "../../hooks/useAuth"
import { Link } from "react-router-dom"

import festival from '../../icons/festival.png'
import konzert from '../../icons/konzert.png'

export const Events = () => {
  const { user } = useAuth()
  const { events, fetchEvents } = useEvents()

  const [searchTerm, setSearchTerm] = useState('')

  const resetSearchTerm = () => {
    setSearchTerm('')
  }

  const filteredEvents = events.filter(
    (event) => event.userId === user.uid && (
      (event.band && event.band.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (event.stadt && event.stadt.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (event.location && event.location.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  )

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  useEffect(() => fetchEvents(), [user])

  return (
    <div className="container">
      <div className="d-flex align-items-center justify-content-between">
        <div className="display-6">Eventkalender</div>
        <div className="input-group w-50">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Search everything..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <span className="input-group-text" onClick={resetSearchTerm}>
            <i className="bi bi-x-lg" />
          </span>
        </div>
      </div>
    <hr className="my-4"/>
      {filteredEvents.length > 0 ? (
        <ul className="list-group">
          {filteredEvents
            .map((event) => (
              <Link
                key={event.id}
                to={`/events/${event.id}`}
                className="list-group-item list-group-item-action d-flex gap-3 py-3"            
                state={{ event }}
              >
              <img src={event.typ === 'Festival' ? festival : konzert} alt="twbs" width="40px" height="40px" className="rounded-circle flex-shrink-0" />
              <div className="d-flex gap-2 w-100 justify-content-between">
                <div>
                  <h6 className="mb-0">{event.band}</h6>
                  <p className="mb-0 opacity-75">{event.stadt} / {event.location}</p>
                </div>
                <small className="opacity-50 text-nowrap">{formatDate(event.datum)}</small>
              </div>
            </Link>
          ))}
        </ul>
      ) : (
        <p className="text-muted">Keine Übereinstimmung</p>
      )}
    </div>
  )
}