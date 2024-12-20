import useEvents from "../hooks/useEvents"

const ExportData = () => {
  const { exportEvents } = useEvents()
  const handleExport = async () => await exportEvents()

  return (
    <div className="col-sm-6 col-lg-4 mb-3 mb-sm-3 d-none d-lg-flex">
      <div className="h-100 card shadow">
        <div className="card-body">
          <h5 className="card-title">Daten exportieren</h5>
          <p className="card-text">Hier kannst du alle Events als JSON exportieren</p>
          <button className="btn btn-outline-primary" onClick={handleExport}>
            <i className="bi bi-download me-2"></i>
              Exportieren
            </button>
        </div>
      </div>
    </div>
  )
}

export default ExportData