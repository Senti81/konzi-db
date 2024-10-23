import '../styles/spinner.css'
const Spinner = () => {
  return (
    <div className="spinner-wrapper">
      <div className="spinner-border text-primary" aria-hidden="true">
        <span className="visually-hidden">Loading...</span>    
      </div>
    </div>
  )
}

export default Spinner