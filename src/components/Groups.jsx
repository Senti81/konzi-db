import React, { useState } from 'react'
import useGroups from '../hooks/useGroups'

const Groups = () => {
  const { connectUsers } = useGroups()

  const [currentUser, setCurrentUser] = useState('')
  const [connectedUser, setConnectedUser] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await connectUsers(currentUser, connectedUser)
    setMessage(result.message)
  }

  return (
    <div className="col-sm-6 col-lg-4 mb-3 mb-sm-3">
      <div className="h-100 card shadow">
        <div className="card-body">
          <h5 className="card-title">Events teilen</h5>
          <p className="card-text"><small>Teile deine Events mit anderen</small></p>
          <form onSubmit={handleSubmit}>  
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Wer teilt ?" value={currentUser} onChange={(e) => setCurrentUser(e.target.value)}/>
            </div>        
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Mit wem ?" value={connectedUser} onChange={(e) => setConnectedUser(e.target.value)}/>
            </div>
            <button className="btn btn-outline-secondary rounded d-inline d-sm-none" type="submit">
              <i className="bi bi-check-lg px-1"/>Aktivieren
            </button>
          </form>
          <strong className='my-2'>{message}</strong>
        </div>        
      </div>
    </div>
  )
}

export default Groups