import { NavLink } from "react-router-dom"
import pic from '../icons/brand.png'

const LandingPageHero = () => (
  <div className="d-flex flex-wrap flex-column flex-lg-row align-items-center px-4 py-5 mb-5 text-center rounded-3 border shadow-lg">
    <div className="col-lg-6 text-end mb-4 mb-lg-0">
      <img className="d-block mx-auto rounded shadow-lg" src={pic} alt="" />
    </div>
    <div className="col-lg-6 text-start">
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-start">
        <NavLink to="events/add" type="button" className="btn btn-primary btn-lg rounded-5 px-4">Neues Event hinzufügen</NavLink>
        <NavLink to="events" type="button" className="btn btn-outline-secondary rounded-5 btn-lg px-4">Zum Eventkalender</NavLink>
      </div>
    </div>
  </div>
)

export default LandingPageHero