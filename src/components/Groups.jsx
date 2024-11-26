import React, { useEffect, useState } from 'react'
import useGroups from '../hooks/useGroups'
import useAuth from '../hooks/useAuth'

const Groups = () => {
  const { group, fetchGroup, toggleGroupActive } = useGroups()
  const [active, setActive] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    if (group?.active !== undefined)
      setActive(group.active)
  }, [group])

  useEffect(() => {
    fetchGroup()
  }, [user])

  const toggle = () => {
    setActive(!active)
    toggleGroupActive(active)
  }

  return (
    <div className="col-sm-6 col-lg-4 mb-3 mb-sm-3">
      <div className="h-100 card shadow">
        <div className="card-body">
          <h5 className="card-title">Gruppen <span className="badge text-bg-secondary">Neu</span></h5>

          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              checked={active}
              onChange={toggle}
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            > 
              {!active ? 'Nur eigene Events anzeigen' : 'Events von Freunden anzeigen'}
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Groups