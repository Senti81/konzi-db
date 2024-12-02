import React, { useEffect } from 'react'
import useGroups from '../hooks/useGroups'

const RegisteredUsers = () => {
  const { fetchUsers, users } = useGroups()

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="col-sm-6 col-lg-4 mb-3 mb-sm-3">
      <div className="h-100 card shadow">
        <div className="card-body">
          <h5 className="card-title">Registrierte Benutzer</h5>
          <p className="card-text"><small></small></p>
          <ul className='list-group list-group-flush'>
            {users?.map((singleUser) =>
              <li 
                key={singleUser.id}
                className='list-group-item'
              >{singleUser.displayName}
              </li>
            )}
          </ul>
        </div>        
      </div>
    </div>
  )
}

export default RegisteredUsers