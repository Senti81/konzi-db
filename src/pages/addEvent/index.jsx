import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useEvents from "../../hooks/useEvents"

export const Add = () => {

  const [ datum, setDatum ] = useState('')
  const [ band, setBand ] = useState('')
  const [ stadt, setStadt ] = useState('')
  const [ location, setLocation ] = useState('')
  const [ typ, setTyp ] = useState('')
  const [ bemerkung, setBemerkung ] = useState('')

  const { addEvent } = useEvents()
  const navigate = useNavigate()

  const handleSubmit = async () => {
    const result = await addEvent(datum, band, stadt, location, typ, bemerkung)
    console.log(result.message)

    setDatum('')
    setBand('')
    setStadt('')
    setLocation('')
    setTyp('')
    setBemerkung('')
 
    navigate('/events')
  }

  return (
    <div className="container">
      <div className="display-6 mb-3">Neues Event hinzufügen</div>

      {/* Draft Banner */}
      <div className="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Hinweis!</strong> Die Seite ist noch im Entwurfsstatus. Fehler können passieren 🤣
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>

      <div className="form-floating mb-3">
        <input type="date" className="form-control" id="floatingDatum" placeholder="Datum" value={datum} onChange={(e) => setDatum(e.target.value)} />
        <label htmlFor="floatingDatum">Datum</label>
      </div>
      <div className="form-floating mb-3">
        <input type="text" className="form-control" id="floatingBand" placeholder="Band" value={band} onChange={(e) => setBand(e.target.value)} />
        <label htmlFor="floatingBand">Band</label>
      </div>
      <div className="form-floating mb-3">
        <input type="text" className="form-control" id="floatingStadt" placeholder="Stadt" value={stadt} onChange={(e) => setStadt(e.target.value)} />
        <label htmlFor="floatingStadt">Stadt</label>
      </div>
      <div className="form-floating mb-3">
        <input type="text" className="form-control" id="floatingLocation" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
        <label htmlFor="floatingLocation">Location</label>
      </div>
      <div className="form-floating mb-3">
        <select className="form-select" id="floatingTyp" value={typ} onChange={(e) => setTyp(e.target.value)}>
          <option defaultValue='Konzert'>Wähle aus</option>
          <option value="Konzert">Konzert</option>
          <option value="Festival">Festival</option>
        </select>
        <label htmlFor="floatingTyp">Typ</label>
      </div>
      <div className="form-floating mb-3">
        <input type="text" className="form-control" id="floatingBemerkungen" placeholder="Bemerkungen" value={bemerkung} onChange={(e) => setBemerkung(e.target.value)} />
        <label htmlFor="floatingBemerkungen">Bemerkungen</label>
      </div>
      <div className="d-flex justify-content-between">
        <button className="btn btn-primary rounded" onClick={handleSubmit}>Speichern</button>
        <Link className="btn btn-outline-secondary rounded" to={'/'}>Abbrechen</Link>
      </div>
    </div>
  )
}