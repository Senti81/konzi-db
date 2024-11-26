import React from 'react'
import brand from '../icons/brand.png'
import { Outlet, NavLink } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Navbar = () => {
  const { user } = useAuth()
  return (
    <>
      <nav className="navbar fixed-top navbar-expand-sm bg-body-tertiary">
        <div className='container-fluid'>
          <div className="navbar-collapse d-flex align-items-center justify-content-between" id="navbarNav">
            <NavLink className="navbar-brand" to="/">
              <img src={brand} className='rounded-2' alt="Konzi DB" width="30" height="30"/>
            </NavLink>
            <ul className="navbar-nav flex-row">

              <li className='nav-item d-none d-sm-block'>
                <NavLink className={({ isActive }) => `nav-link ${isActive ? 'border-bottom border-black border-1' : ''}`} to="events">
                  Eventkalender
                </NavLink>              
              </li>             
              {/* <li className='nav-item d-none d-sm-block'>
                <NavLink className={({ isActive }) => `nav-link ${isActive ? 'border-bottom border-black border-1' : ''}`} to="statistics">
                  Statistiken
                </NavLink>              
              </li>     */}

              <li className="nav-item d-block d-sm-none">
                <NavLink className={({ isActive }) => `nav-link rounded px-3 ${isActive ? 'bg-secondary text-light' : ''}`} to="events">
                  <i className="bi bi-calendar-event"></i>
                </NavLink>
              </li>             
              {/* <li className="nav-item d-block d-sm-none">
                <NavLink className={({ isActive }) => `nav-link rounded px-3 ${isActive ? 'bg-secondary text-light' : ''}`} to="statistics">
                  <i className="bi bi-123"></i>
                </NavLink>
              </li>    */}

            </ul>
            <ul className='navbar-nav ms-auto'>
              <li className="nav-item d-none d-sm-block">
                <NavLink className={({ isActive }) => `nav-link ${isActive ? 'border-bottom border-black border-1' : ''}`} to="profile">
                  Mein Profil
                </NavLink>  
              </li>
              <li className="nav-item d-block d-sm-none">
                <NavLink className="nav-link px-3" to="profile">
                  <img
                    src={user?.photoURL}
                    alt="profilePic"
                    className="profile-pic"
                    style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                  />
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  )
}

export default Navbar