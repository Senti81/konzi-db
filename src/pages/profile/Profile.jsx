import ProfileDetails from "../../components/ProfileDetails"
import ImportData from "../../components/ImportData"
import ExportData from "../../components/ExportData"
import Logout from "../../components/Logout"
import Groups from "../../components/Groups"

const Profile = () => {
  return (
    <div className="container">
      <ProfileDetails />
      <hr className="my-3"/>
      <div className="row">
        <Groups />
        <ExportData />
        <ImportData />
        <Logout />
      </div>    
    </div>
  )
}

export default Profile