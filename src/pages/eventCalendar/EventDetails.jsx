import { useLocation } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import EventHeader from "../../components/eventCalendar/EventHeader"
import EventFooter from "../../components/eventCalendar/EventFooter"
import EventBody from "../../components/eventCalendar/EventBody"

const EventDetails = () => {
  const location = useLocation()
  const event = location.state?.event
  const { user } = useAuth()
  
  return (
    <div className="container">      
      <div className="card w-auto w-md-100 shadow">
        <EventHeader band={event.band} />
        <EventBody event={event} />
        <EventFooter user={user} event={event} />
      </div>
    </div>
  )
}

export default EventDetails