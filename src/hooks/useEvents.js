import { useState } from "react"
import useAuth from "./useAuth"
import { addDoc, collection, deleteDoc, doc, getDocs, limit, onSnapshot, orderBy, query, Timestamp, where } from "firebase/firestore"
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
    const q = query(collection(db, 'events'), limit(recent ? 3 : 10000), orderBy('createdAt', 'desc'))
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

  const addEvent = async (date, band, city, location, type, bemerkung) => {
    if (!user) return
    setLoading(true)
    setError(null)
    try {
      const eventData = { userId: user.uid, date, band, city, location, type, bemerkung, createdAt: Timestamp.now() }
      await addDoc(collection(db, 'events'), eventData)
      return { success: true, message: 'Event erfolgreich hinzugefügt' }
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
    try {
      const fileContent = await file.text()
      const eventsData = JSON.parse(fileContent)

      for (const event of eventsData) {
        await addDoc(collection(db, 'events'), {
          ...event,
          userId: user.uid,
          createdAt: Timestamp.now()
        })
      }
      console.log('Import erfolgreich')
    } catch (error) {
      console.error('Fehler beim Import:', error)
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
  return { events, importEvents, exportEvents, loading, error, fetchEvents, addEvent, deleteEvent }
}
export default useEvents