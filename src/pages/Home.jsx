import { Link, NavLink } from 'react-router-dom'
import pic from '../icons/brand.png'
import useAuth from '../hooks/useAuth'
import useEvents from '../hooks/useEvents'
import { useEffect } from 'react'

const Home = () => {
  const { user } = useAuth()
  const { events, fetchEvents } = useEvents()
 
  useEffect(() => { fetchEvents(true)}, [user])

  return (
    <div className="container mt-1">
      <div className="d-flex flex-wrap flex-column flex-lg-row align-items-center px-4 py-5 mb-5 text-center rounded-3 border shadow-lg">
        <div className="col-lg-6 text-end mb-4 mb-lg-0">
          <img className="d-block mx-auto rounded shadow-lg" src={pic} alt="" />
        </div>
        <div className="col-lg-6 text-start">
          <h1 className="display-5 fw-bold text-body-emphasis">Hey {user?.displayName.split(' ')[0]}</h1>
          <p className="lead mb-4">Soll hier ein Text stehen? Wenn ja welcher?</p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-start">
            <NavLink to="events/add" type="button" className="btn btn-primary btn-lg rounded-5 px-4">Neues Event hinzufügen</NavLink>
            <NavLink to="events" type="button" className="btn btn-outline-secondary rounded-5 btn-lg px-4">Zum Eventkalender</NavLink>
          </div>
        </div>
      </div>

        <div className="container">
          <p className="display-6">Zuletzt hinzugefügt:</p>
          <div className="row">
          {events
            .filter((event) => event.userId === user.uid)
            .map((event) => (
            <div className="col-sm-6 col-lg-4 mb-3 mb-sm-3 shadow-md" key={event.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{event.band}</h5>
                  <p className="card-text">{event?.bemerkung}</p>
                  <Link
                    to={`/events/${event.id}`}
                    state={{ event }}
                    className="btn btn-outline-info"
                    > Details
                  </Link>
                  <h6 className="card-subtitle text-body-secondary mt-3 small">Added: {event.createdAt.toDate().toLocaleString('de-DE', {dateStyle: 'long'})}</h6>
                </div>
              </div>
            </div>    
          ))}
        </div>    
      </div>
    </div>
  )
}

export default Home