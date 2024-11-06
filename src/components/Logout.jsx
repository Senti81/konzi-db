import React from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }
  return (
    <div className="col-sm-6 col-lg-4 mb-3 mb-sm-3">
      <div className="h-100 card shadow">
        <div className="card-body">
          <h5 className="card-title">Abmelden</h5>
          <p className="card-text"></p>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            <i className="bi bi-door-closed me-2"></i>
            Ausloggen
          </button>
        </div>
      </div>
    </div>
  )
}

export default Logout