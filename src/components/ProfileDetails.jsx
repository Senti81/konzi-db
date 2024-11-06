import useAuth from "../hooks/useAuth"

const ProfileDetails = () => {
  const { user } = useAuth()

  return (
    <div className="h-100 p-3">
      <div className="d-flex align-items-center">
        <div className="me-3">
          <img 
            src={user?.photoURL} 
            alt="pic" 
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
  )
}

export default ProfileDetails