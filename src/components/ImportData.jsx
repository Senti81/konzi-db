import { useState } from "react"
import useEvents from "../hooks/useEvents"
import { useNavigate } from "react-router-dom"

const ImportData = () => {

  const { importEvents, error } = useEvents()
  const navigate = useNavigate()

  const [ selectedFile, setSelectedFile ] = useState(null)

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) setSelectedFile(file)
  }

  const handleImport = async () => {
    if (selectedFile) {
      const result = await importEvents(selectedFile)
      if (result?.success) navigate('/')
    }
  }

  return (
    <div className="col-sm-6 col-lg-4 mb-3 mb-sm-3 d-none d-lg-flex">
      <div className="h-100 card shadow">
        <div className="card-body">
          <h5 className="card-title">Daten importieren</h5>
          <p className="card-text"><small>Import von Event-Daten. Muss im Format JSON sein</small></p>
          <div className="mb-3">
            <input className="form-control" type="file" accept="application/json" id="formFile" onChange={handleFileChange}/>
          </div>
          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {error}
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          )}
          <button className="btn btn-outline-primary" disabled={!selectedFile} onClick={handleImport}>
            <i className="bi bi-upload me-2"></i>
            Importieren
          </button>
        </div>
      </div>
    </div> 
  )
}

export default ImportData