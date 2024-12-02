import { Link } from "react-router-dom"

const EventFooter = ({ user, event }) => (
  <div className="card-footer text-body-secondary d-flex justify-content-between">
  { user?.uid === event?.userId &&
    <Link
      to={`/events/${event.id}/edit`}
      state={{ event }}
      className="btn btn-outline-secondary"
      >
          <i className="bi bi-pencil me-2"></i>

      Bearbeiten
    </Link>
  }
  <Link to={'..'} relative="path" className="btn btn-primary">
    <i className="bi bi-arrow-counterclockwise me-2"></i>
    Zurück
  </Link>
</div>
)

export default EventFooter