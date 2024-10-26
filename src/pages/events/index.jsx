import { useEffect } from "react"
import useEvents from "../../hooks/useEvents"
import useAuth from "../../hooks/useAuth"
import { Link } from "react-router-dom"

export const Events = () => {
  const { user } = useAuth()
  const { events, fetchEvents } = useEvents()

  useEffect(() => fetchEvents(), [user])
  return (
    <div className="container">
      <div className="display-3">Eventkalender</div>
      <ul className="list-group">
        {events
        .filter((event) => event.userId === user.uid)
        .map((event) => (
          <Link
            key={event.id}
            className="list-group-item"
            to={`/events/${event.id}`}
            state={{ event }}
          >
            {event.band}
          </Link>
        ))}
      </ul>
    </div>
  )
}