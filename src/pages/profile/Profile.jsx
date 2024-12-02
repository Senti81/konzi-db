import ProfileDetails from "../../components/ProfileDetails"
import ImportData from "../../components/ImportData"
import ExportData from "../../components/ExportData"
import Logout from "../../components/Logout"
import Groups from "../../components/Groups"
import useAuth from "../../hooks/useAuth"

const Profile = () => {

  const { isAdmin } = useAuth()

  return (
    <div className="container">
      <ProfileDetails />
      <hr className="my-3"/>
      <div className="row">
        { isAdmin && <Groups /> }
        <ExportData />
        <ImportData />
        <Logout />
      </div>    
    </div>
  )
}

export default Profile