import React from 'react';
import brand from '../icons/brand.png'
import { Outlet, NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const { logout } = useAuth()
  return (
    <>
      <nav className="navbar fixed-top navbar-expand-sm bg-body-tertiary">
        <div className='container-fluid'>
          <div className="navbar-collapse d-flex align-items-center justify-content-between" id="navbarNav">
            <a className="navbar-brand" href="/">
              <img src={brand} className='rounded-2' alt="Konzi DB" width="30" height="30"/>
            </a>
            <ul className="navbar-nav flex-row">
              <li className='nav-item active d-none d-sm-block'>
                <NavLink
                  className={({ isActive }) => "nav-link" + (isActive ? " border-bottom border-black border-1" : "")}
                  to="events"
                  end
                  >
                  Events
                </NavLink>              
              </li>             
              <li className="nav-item d-block d-sm-none">
                <NavLink
                  className={({ isActive }) => "nav-link" + (isActive ? " bg-secondary text-light rounded px-3" : " px-3")}
                  to="events"
                  end
                  >
                  <i className="bi bi-calendar-event"></i>
                </NavLink>
              </li>             
            </ul>
            <ul className='navbar-nav ms-auto'>
              <li className="nav-item d-none d-sm-block">
                <button className="nav-link text-danger" onClick={logout}>Abmelden</button>
              </li>
              <li className="nav-item d-block d-sm-none">
                <i className="bi bi-box-arrow-right text-danger fs-3" onClick={logout}/>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  )
};

export default Navbar;
