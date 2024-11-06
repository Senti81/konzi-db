import { useState } from "react"
import useAuth from "./useAuth"
import { addDoc, collection, deleteDoc, doc, getDocs, limit, onSnapshot, orderBy, query, Timestamp, updateDoc } from "firebase/firestore"
import { db } from "../config/firebase"
import { saveAs } from "file-saver"


const useEvents = () => {
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)
  const [events, setEvents] = useState([])
  const { user } = useAuth()

  const fetchEvents = (recent = false) => {
    if (!user) return
    setLoading(true)
    setError(null)
    const q = query(collection(db, 'events'), limit(recent ? 3 : 10000), orderBy('datum', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const events = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(events);
      setLoading(false);
    }, (error) => {
      console.error("Fehler beim Abrufen der Events: ", error.message);
      setError(error)
      setLoading(false);
    });
    return () => unsubscribe();
  }

  const addEvent = async (datum, band, supportBands, stadt, location, typ, bemerkung) => {
    if (!user) return
    setLoading(true)
    setError(null)
    try {
      const eventData = { userId: user.uid, datum, band, supportBands, stadt, location, typ, bemerkung, createdAt: Timestamp.now() }
      await addDoc(collection(db, 'events'), eventData)
      return { success: true, message: 'Event erfolgreich hinzugefügt' }
    } catch (error) {
      setError(error.message)
      return { success: false, message: error.message }
    } finally {
      setLoading(false)
    }
  }

  const updateEvent = async (eventId, datum, band, supportBands, stadt, location, typ, bemerkung) => {
    if (!user) return
    setLoading(true)
    setError(null)
    try {
      const eventData = { datum, band, supportBands, stadt, location, typ, bemerkung, updatedAt: Timestamp.now() }
      await updateDoc(doc(db, 'events', eventId), eventData)
      return { success: true, message: 'Event erfolgreich aktualisiert' }
    } catch (error) {
      setError(error.message)
      return { success: false, message: error.message }
    } finally {
      setLoading(false)
    }
  }

  const deleteEvent = async (id) => {
    if (!id) return
    try {
      await deleteDoc(doc(db, 'events', id))
      console.log(`Event mit ID ${id} gelöscht`);
    } catch (error) {
      console.error("Fehler beim Löschen des Events: ", error);
    }
  }

  // IMPORT
  const importEvents = async (file) => {
    setLoading(true)
    setError(null)
    try {
      const fileContent = await file.text()
      const eventsData = JSON.parse(fileContent)

      const expectedKeys = ["datum", "band", "stadt", "location", "typ", "bemerkung"];

      for (const event of eventsData) {
        const eventKeys = Object.keys(event);
        if (
          eventKeys.length !== expectedKeys.length || 
          !expectedKeys.every(key => eventKeys.includes(key))
        ) {
          setError('Fehler in JSON Daten')
          return
        }
        await addDoc(collection(db, 'events'), {
          ...event,
          userId: user.uid,
          createdAt: Timestamp.now()
        })
      }
      return { success: true, message: 'Import erfolgreich' }
    } catch (error) {
      setError(error)
      return { success: false, message: error.message }
    } finally {
      setLoading(false)
    }
  }

  // EXPORT
  const exportEvents = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'events'))
      const data = snapshot.docs
        .filter(doc => doc.data().userId === user.uid)
        .map(doc => {        
        const { createdAt, userId, ...rest } = doc.data();
        return rest;
      }); 
      const jsonBlob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      saveAs(jsonBlob, 'export.json')      
    } catch (error) {
      console.error('Fehler beim Exportieren der Daten:', error)
    }
  }

  const filteredEvents = (events, user, searchTerm) => {
    return events.filter(
      (event) => event.userId === user.uid && (
        (event.band && event.band.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (event.stadt && event.stadt.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (event.location && event.location.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    )    
  }

  return {
    events,
    loading,
    error,
    filteredEvents,
    importEvents,
    exportEvents,
    fetchEvents,
    addEvent,
    updateEvent,
    deleteEvent
   }
}
export default useEvents