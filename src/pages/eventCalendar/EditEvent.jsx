import { useLocation } from "react-router-dom"

const EditEvent = () => {
  const location = useLocation()
  const event = location.state?.event
  
  return (
    <div className="container">
      {/* Draft Banner */}
      <div className="alert alert-danger alert-dismissible fade show" role="alert">
        <strong> ToDo 🤣</strong>
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    </div>
  )
}

export default EditEvent