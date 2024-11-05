import React from "react"
import SingleEvent from "./SingleEvent"

const EventResultList = ({ filteredEvents }) => {
  return (
    filteredEvents.length > 0 && (
      <ul className="list-group mx-3 mx-md-1">
        { filteredEvents.map((event) => <SingleEvent event={event} key={event.id}/>) }
      </ul>
      )
  )
}
export default EventResultList