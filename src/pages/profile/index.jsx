import { useNavigate } from "react-router-dom"
import Spinner from "../../components/Spinner"
import useEvents from "../../hooks/useEvents"
import { useState } from "react"
import useAuth from "../../hooks/useAuth"

export const Profile = () => {
  const { user, logout } = useAuth()
  const { importEvents, exportEvents, loading } = useEvents()

  const [ selectedFile, setSelectedFile ] = useState(null)

  const navigate = useNavigate()

  const handleExport = async () => {
    await exportEvents()
  }
  
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) setSelectedFile(file)
  }

  const handleImport = async () => {
    if (selectedFile) {
      await importEvents(selectedFile)
      navigate('/')
    }
  }

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  if (loading) return <Spinner />
  return (
    <div className="container">
      <div className="h-100 p-3">
        <div className="d-flex align-items-center">
          <div className="me-3">
            <img 
              src={user?.photoURL} 
              alt="User Photo" 
              className="rounded-circle" 
              style={{ width: '80px', height: '80px', objectFit: 'cover' }}
            />
          </div>
          <div>
            <h5 className="card-title mb-1">{user?.displayName}</h5>
            <p className="card-text text-muted mb-0">{user?.email}</p>
          </div>
        </div>
      </div>
      <hr className="my-3"/>
      <div className="row">
        <div className="col-sm-6 col-lg-4 mb-3 mb-sm-3">
          <div className="h-100 card shadow">
            <div className="card-body">
              <h5 className="card-title">Daten exportieren</h5>
              <p className="card-text">Es werden alle Daten in JSON Format heruntergeladen</p>
              <button className="btn btn-outline-primary" onClick={handleExport}>Exportieren</button>
            </div>
          </div>
        </div>    
        <div className="col-sm-6 col-lg-4 mb-3 mb-sm-3">
          <div className="h-100 card shadow">
            <div className="card-body">
              <h5 className="card-title">Daten importieren</h5>
              <p className="card-text">fghfgh</p>
              <div className="mb-3">
                <input className="form-control" type="file" accept="application/json" id="formFile" onChange={handleFileChange}/>
              </div>
              <button className="btn btn-outline-primary" disabled={!selectedFile} onClick={handleImport}>Importieren</button>
            </div>
          </div>
        </div>    
        <div className="col-sm-6 col-lg-4 mb-3 mb-sm-3">
          <div className="h-100 card shadow">
            <div className="card-body">
              <h5 className="card-title">Abmelden</h5>
              <p className="card-text">fghfgh</p>
              <button className="btn btn-outline-danger" onClick={handleLogout}>Ausloggen</button>
            </div>
          </div>
        </div>    
      </div>    
    </div>
  )
}