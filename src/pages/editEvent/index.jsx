import { useLocation } from "react-router-dom"

export const Edit = () => {
  const location = useLocation()
  const event = location.state?.event
  return <div className="display-6">TODO: Bearbeite Event mit Id: {event.id}</div>
}