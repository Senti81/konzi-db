import { Link, useLocation, useNavigate } from "react-router-dom"
import useEvents from "../../hooks/useEvents"

export const Event = () => {
  const location = useLocation()
  const event = location.state?.event

  const navigate = useNavigate()

  const { deleteEvent } = useEvents()

  const handleDelete = async () => {
    await deleteEvent(event.id)
    navigate('/')
  }
  
  return (
    <div className="container">
      <div className="card" style={{ width: '18rem'}}>
        <div className="card-body">
          <h5 className="card-title">{event?.band}</h5>
          <p className="card-text">{event?.notes}</p>
          <Link
            to={`/events/${event.id}/edit`}
            state={{ event }}
            className="btn btn-outline-warning"
          >
            Edit
          </Link>
          <button className="btn btn-danger ms-5" onClick={handleDelete}>Löschen</button>
        </div>
      </div>
    </div>
  )
}