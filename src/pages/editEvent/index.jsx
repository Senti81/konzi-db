import { useLocation } from "react-router-dom"

export const Edit = () => {
  const location = useLocation()
  const event = location.state?.event
  return <h1>Edit Event {event.id}</h1>
}