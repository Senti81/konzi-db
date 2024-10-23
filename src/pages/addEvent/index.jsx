import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useEvents from "../../hooks/useEvents"

export const Add = () => {

  const [ date, setDate ] = useState('')
  const [ band, setBand ] = useState('')
  const [ city, setCity ] = useState('')
  const [ location, setLocation ] = useState('')
  const [ type, setType ] = useState('')
  const [ notes, setNotes ] = useState('')

  const { addEvent } = useEvents()
  const navigate = useNavigate()

  const handleSubmit = async () => {
    const result = await addEvent(date, band, city, location, type, notes)
    console.log(result.message)

    setDate('')
    setBand('')
    setCity('')
    setLocation('')
    setType('')
    setNotes('')
 
    navigate('/events')
  }

  return (
    <div className="container">
      <div className="form-floating mb-3">
        <input type="date" className="form-control" id="floatingDatum" placeholder="Datum" value={date} onChange={(e) => setDate(e.target.value)} />
        <label htmlFor="floatingDatum">Datum</label>
      </div>
      <div className="form-floating mb-3">
        <input type="text" className="form-control" id="floatingBand" placeholder="Band" value={band} onChange={(e) => setBand(e.target.value)} />
        <label htmlFor="floatingBand">Band</label>
      </div>
      <div className="form-floating mb-3">
        <input type="text" className="form-control" id="floatingStadt" placeholder="Stadt" value={city} onChange={(e) => setCity(e.target.value)} />
        <label htmlFor="floatingStadt">Stadt</label>
      </div>
      <div className="form-floating mb-3">
        <input type="text" className="form-control" id="floatingLocation" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
        <label htmlFor="floatingLocation">Location</label>
      </div>
      <div className="form-floating mb-3">
        <input type="text" className="form-control" id="floatingTyp" placeholder="Typ" value={type} onChange={(e) => setType(e.target.value)} />
        <label htmlFor="floatingTyp">Typ</label>
      </div>
      <div className="form-floating mb-3">
        <input type="text" className="form-control" id="floatingBemerkungen" placeholder="Bemerkungen" value={notes} onChange={(e) => setNotes(e.target.value)} />
        <label htmlFor="floatingBemerkungen">Bemerkungen</label>
      </div>
      <div className="d-flex justify-content-between">
        <button className="btn btn-primary rounded" onClick={handleSubmit}>Submit</button>
        <Link className="btn btn-outline-secondary rounded" to={'/'}>Abbrechen</Link>
      </div>
    </div>
  )
}