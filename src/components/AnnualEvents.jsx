import { useEffect } from "react"
import useAuth from "../hooks/useAuth"
import useEvents from "../hooks/useEvents"
import SingleEvent from "./SingleEvent"

const AnnualEvents = () => {
  const { user } = useAuth() 
  const { events, fetchEvents } = useEvents()

  const formatDate = (d) => {
    return new Date(d).toLocaleDateString('de-DE', { day: 'numeric', month: 'long' });
  }

  const isAnnual = (d) => {
    const eventDate =  new Date(d)
    const today =  new Date()
    eventDate.setHours(0, 0, 0, 0)
    today.setHours(0, 0, 0, 0)
    return (eventDate.getDate() === today.getDate() && eventDate.getMonth() === today.getMonth())
  }
  const filteredEvents = events.filter((event) => event.userId === user.uid && isAnnual(event.datum));

  useEffect(() => { 
    fetchEvents()
  }, [user])

  return (
    <div className="d-flex flex-wrap flex-column flex-lg-row align-items-center px-4 py-2 mb-5 text-center rounded-3 border shadow-lg">
      <div className="col-lg-6 text-start mb-4 mb-lg-0">
        <p className="fs-4">Wo warst du am {formatDate(new Date())} ?</p>
        <div className="row">       
          {filteredEvents.length === 0 ? <p>Wohl nicht auf einem Konzert 😋</p> : filteredEvents.map((event) => 
            <div className="col-sm-12 col-lg-12 mb-3 mb-sm-3" key={event.id}>
              <div className="h-100 card shadow">
                <div className="card-body">
                  <SingleEvent event={event}/>
                </div>
              </div>
            </div>
          )}
        </div>    
      </div>    
    </div>
  )
}

export default AnnualEvents