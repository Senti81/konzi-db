import React from "react"
import { Link } from "react-router-dom"

const SearchAddEvents = ({ searchTerm, setSearchTerm}) => {
  const resetSearchTerm = () => setSearchTerm('')

  return (
    <div className="d-flex align-items-center flex-md-column">
      <div className="input-group mb-md-1 m-3 w-100">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Search everything..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <span className="input-group-text" onClick={resetSearchTerm}>
          <i className="bi bi-x-lg" />
        </span>
      </div>
      <Link className="d-none d-md-block btn btn-outline-primary mb-md-1 m-3 w-75" to={'/events/add'}>Neues Event hinzufügen</Link>
      <Link className="d-block d-md-none btn btn-outline-primary mb-md-1 m-3" to={'/events/add'}>
        <i className="bi bi-calendar2-plus ms-1"></i>
      </Link>
    </div>
  )
}

export default SearchAddEvents