import { useEffect, useState } from "react"
import useEvents from "../../hooks/useEvents"
import useAuth from "../../hooks/useAuth"
import { Link } from "react-router-dom"

import festival from '../../icons/festival.png'
import konzert from '../../icons/konzert.png'

 const EventList = () => {
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
      month: 'short',
      year: 'numeric'
    });
  }

  useEffect(() => fetchEvents(), [user])

  return (
    <div className="container">
      <p className="display-6 mb-3 mb-md-0">Eventkalender</p>
      <hr className="my-4"/>
      <div className="row">
        <div className="col-md-5">
          <div className="d-flex align-items-center flex-md-column">
            <div className="input-group mb-md-1 m-3 w-100">
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
            <Link className="d-none d-md-block btn btn-outline-primary mb-md-1 m-3 w-75" to={'/events/add'}>Neues Event hinzufügen</Link>
            <Link className="d-block d-md-none btn btn-outline-primary mb-md-1 m-3" to={'/events/add'}>
              <i className="bi bi-calendar2-plus ms-1"></i>
            </Link>
          </div>
        </div>
        <div className="col-md-7">
          {filteredEvents.length > 0 && (
            <ul className="list-group mx-3 mx-md-1">
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
              ))}
            </ul>
            )}
        </div>        
      </div>
    </div>
  )
}

export default EventList