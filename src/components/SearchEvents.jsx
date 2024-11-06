import React from "react"

const SearchEvents = ({ searchTerm, setSearchTerm}) => {
  const resetSearchTerm = () => setSearchTerm('')

  return (
    <div className="d-flex align-items-center flex-md-column">
      <div className="input-group mb-md-1 mx-2 mb-2 w-100">
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
    </div>
  )
}

export default SearchEvents