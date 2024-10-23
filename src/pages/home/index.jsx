import { Link, NavLink } from 'react-router-dom'
import pic from '../../icons/logo.webp'
import useAuth from '../../hooks/useAuth'
import useEvents from '../../hooks/useEvents'
import { useEffect } from 'react'

export const Home = () => {
  const { user } = useAuth()
  const { events, fetchEvents } = useEvents()
  
  useEffect(() => { fetchEvents(true)}, [user])

  return (
    <div className="container mt-3">
      <div className="px-4 py-5 my-5 text-center rounded-3 border shadow-lg">
          <img className="d-block mx-auto mb-4 rounded shadow-lg" src={pic} alt="" width="50%" />
          <h1 className="display-5 fw-bold text-body-emphasis">Hey {user?.displayName.split(' ')[0]}</h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae animi magnam porro sed sint non voluptates dignissimos minima ad voluptatibus id tempora, dolor cumque fugit. Facere maiores iure dolores placeat?</p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <NavLink to="events/add" type="button" className="btn btn-primary btn-lg rounded-5 px-4">Add Event</NavLink>
              <NavLink to="events" type="button" className="btn btn-outline-secondary rounded-5 btn-lg px-4">Events</NavLink>
            </div>
          </div>
        </div>

    <div className="container">
      <p className="display-6">Zuletzt hinzugefügt:</p>
     <div className="row">
      {events.map((event) => (
       <div className="col-sm-6 col-lg-4 mb-3 mb-sm-3 shadow-md" key={event.id}>
         <div className="card">
          <div className="card-body">
             <h5 className="card-title">{event.band}</h5>
             <p className="card-text">{event?.notes}</p>
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