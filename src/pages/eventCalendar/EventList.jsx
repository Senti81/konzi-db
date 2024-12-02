import { useEffect, useState } from "react"
import useEvents from "../../hooks/useEvents"
import useAuth from "../../hooks/useAuth"
import Spinner from '../../components/Spinner'

import SearchEvents from "../../components/SearchEvents"
import EventResultList from "../../components/EventResultList"
import { Link } from "react-router-dom"

const EventList = () => {
  const [searchTerm, setSearchTerm] = useState('')
  
  const { user } = useAuth()
  const { events, loading, fetchEvents, filteredEvents } = useEvents()

  useEffect(() => {
    fetchEvents()
  }, [user])

  if (loading) return <Spinner />
  
  return (
    <div className="container">
      <div className="d-flex align-items-center justify-content-between">
        <p className="display-6 mb-2 mb-md-0">Eventkalender</p>
        <Link className="d-none d-sm-block btn btn-outline-primary mb-md-1 m-2" to={'/events/add'}>Neues Event hinzufügen</Link>
        <Link className="d-block d-sm-none btn btn-outline-primary mb-md-1 m-2" to={'/events/add'}>
          <i className="bi bi-calendar2-plus ms-1"></i>
        </Link>
        </div>

      <hr className="my-3 border border-dark"/>
      <div className="row">
        <div className="col-md-5">
          <SearchEvents searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </div>
        <div className="col-md-7">
          <EventResultList filteredEvents={filteredEvents(events, searchTerm)}/>
        </div>        
      </div>
    </div>
  )
}

export default EventList