import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useEvents from "../../hooks/useEvents"

const AddEvent = () => {

  const [ datum, setDatum ] = useState('')
  const [ band, setBand ] = useState('')
  const [ supportBands, setSupportBands ] = useState([])
  const [ supportBand, setSupportBand ] = useState('')
  const [ stadt, setStadt ] = useState('')
  const [ location, setLocation ] = useState('')
  const [ typ, setTyp ] = useState('Konzert')
  const [ bemerkung, setBemerkung ] = useState('')

  const [error, setError] = useState(null)

  const { addEvent } = useEvents()
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

  const handleDeleteSupportBand = (index) => {
    setSupportBands(supportBands.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (error) return
    const result = await addEvent(datum, band, supportBands, stadt, location, typ, bemerkung)

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
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="display-6 mb-3 text-center">Neues Event hinzufügen</div>

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
          <div className="mt-1 mb-4 ps-2">
            {supportBands.map((band, index) => (
              <span
                key={index}
                className="badge rounded-pill bg-success-subtle text-primary-emphasis m-1 px-3 py-2"
                onClick={() => handleDeleteSupportBand(index)}
              >
                {band}
                <span className="vr mx-2" />
                <i className='bi bi-x-circle-fill' />
              </span>
            ))}
          </div>
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
          <button className="btn btn-primary rounded" type="submit">Speichern</button>
          <Link to={'..'} relative="path" className="btn btn-outline-secondary rounded">Abbrechen</Link>
        </div>
        
      </form>
    </div>
  )
}

export default AddEvent