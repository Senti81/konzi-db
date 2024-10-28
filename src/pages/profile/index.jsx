import useEvents from "../../hooks/useEvents"

export const Profile = () => {
  const { importEvents, exportEvents } = useEvents()

  const handleExport = async () => {
    await exportEvents()
  }

  const handleImport = async (event) => {
    const file = event.target.files[0]
    if (file) {
      await importEvents(file)
    }
  }
  return (
    <div className="container">
      <div className="display-6">Profile Page</div>
      <button className="btn btn-warning" onClick={handleExport}>Export</button>
      <input type="file" accept="application/json" onChange={handleImport} />
    </div>
  )
}