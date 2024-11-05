import { useEffect, useState } from "react"
import useEvents from "../../hooks/useEvents"
import useAuth from "../../hooks/useAuth"
import Spinner from '../../components/Spinner'

import SearchAddEvents from "../../components/SearchAddEvents"
import EventResultList from "../../components/EventResultList"

 const EventList = () => {
  const [searchTerm, setSearchTerm] = useState('')
  
  const { user } = useAuth()
  const { events, loading, fetchEvents, filteredEvents } = useEvents()

  useEffect(() => fetchEvents(), [user])

  if (loading) return <Spinner />
  
  return (
    <div className="container">
      <p className="display-6 mb-3 mb-md-0">Eventkalender</p>
      <hr className="my-4"/>
      <div className="row">
        <div className="col-md-5">
          <SearchAddEvents searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </div>
        <div className="col-md-7">
          <EventResultList filteredEvents={filteredEvents(events, user, searchTerm)}/>
        </div>        
      </div>
    </div>
  )
}

export default EventList