import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useEvents from "../hooks/useEvents"
import SupportBandList from "./SupportBandList"

const EventForm = ({ event = {} }) => {

  const [ datum, setDatum ] = useState(event.datum || '')
  const [ band, setBand ] = useState(event.band || '')
  const [ supportBands, setSupportBands ] = useState(event.supportBands || [])
  const [ supportBand, setSupportBand ] = useState('')
  const [ stadt, setStadt ] = useState(event.stadt || '')
  const [ location, setLocation ] = useState(event.location ||'')
  const [ typ, setTyp ] = useState(event.typ || 'Konzert')
  const [ bemerkung, setBemerkung ] = useState(event.bemerkung || '')

  const [error, setError] = useState(null)

  const { addEvent, updateEvent, deleteEvent } = useEvents()
  const navigate = useNavigate()

  const handleAddSupportBand = () => {
    if (supportBand.trim() !== '') {
      setSupportBands([...supportBands, supportBand])
      setSupportBand('')
      setError(null)
    } else {
      setError('Darf nicht leer sein')
    }
  }

  const handleDelete = async () => await deleteEvent(event.id)

  const handleDeleteSupportBand = (index) => {
    setSupportBands(supportBands.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (error) return

    let result
    if (event.id) {
      result = await updateEvent(event.id, datum, band, supportBands, stadt, location, typ, bemerkung);
    } else {
      result = await addEvent(datum, band, supportBands, stadt, location, typ, bemerkung);
    }

    if (result) {
      setDatum('')
      setBand('')
      setStadt('')
      setLocation('')
      setTyp('')
      setBemerkung('')
  
      navigate('/events')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group mb-3">
        <span className="input-group-text w-25">Datum</span>  
        <input type="date" className="form-control" placeholder="Datum" value={datum} onChange={(e) => setDatum(e.target.value)} required/>
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text w-25">Band</span>
        <input type="text" className="form-control" value={band} onChange={(e) => setBand(e.target.value)} required/>
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text w-25">Support</span>
        <input type="text" className="form-control" value={supportBand} onChange={(e) => setSupportBand(e.target.value)}/>
        <button className="btn btn-secondary" type="button" onClick={handleAddSupportBand}>+</button>
      </div>

      { error ? <div className="text-danger mb-3">{error}</div> : (
        <SupportBandList
          supportBands={supportBands}
          handleDeleteSupportBand={handleDeleteSupportBand}
        />
      )}

      <div className="input-group mb-3">
        <span className="input-group-text w-25">Stadt</span>
        <input type="text" className="form-control" value={stadt} onChange={(e) => setStadt(e.target.value)} />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text w-25">Location</span>
        <input type="text" className="form-control" value={location} onChange={(e) => setLocation(e.target.value)} />
      </div>

      <div className="input-group mb-3">
      <span className="input-group-text w-25">Typ</span>
        <select className="form-select" value={typ} onChange={(e) => setTyp(e.target.value)}>
          <option defaultValue="Konzert">Konzert</option>
          <option value="Festival">Festival</option>
        </select>
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text w-25">Bemerkung</span>
        <input type="text" className="form-control" value={bemerkung} onChange={(e) => setBemerkung(e.target.value)} />
      </div>

      <div className="d-flex justify-content-between">
        <button className="btn btn-outline-secondary rounded d-none d-sm-inline-flex" type="submit">Speichern</button>        
        <Link 
          to={'..'}
          relative="path"
          state={{ event }}
          className="btn btn-primary rounded d-none d-sm-inline-flex"
        >
          Abbrechen
        </Link>

        { event.id &&          
          <button className="btn btn-outline-danger d-none d-sm-inline-flex" onClick={handleDelete}>Löschen</button>
        }
      </div>

      <div className="d-flex flex-column gap-3 mx-3">
        <button className="btn btn-outline-secondary rounded d-inline d-sm-none" type="submit">
          <i className="bi bi-check-lg px-1"/>Speichern
        </button>
        <Link
          to={'..'} 
          relative="path" 
          state={{ event }} 
          className="btn btn-primary rounded d-inline d-sm-none"
        >
          <i className="bi bi-x-lg px-2"/>Abbrechen
        </Link>              
        { event.id &&
          <button className="btn btn-outline-danger d-inline d-sm-none mt-5" onClick={handleDelete}>
            <i className="bi bi-trash px-2"/>Löschen
          </button>
        }
      </div>
    </form>
  )
}

export default EventForm