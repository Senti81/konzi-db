import { useLocation } from "react-router-dom"
import EventForm from "../../components/EventForm"

const EditEvent = () => {
  const location = useLocation()
  const event = location.state?.event
  
  return (
    <div className="container">
      <div className="display-6 mb-3 text-center">Event bearbeiten</div>
      <EventForm event={event}/>
    </div>
  )
}

export default EditEvent