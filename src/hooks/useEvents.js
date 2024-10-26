import { useState } from "react"
import useAuth from "./useAuth"
import { addDoc, collection, deleteDoc, doc, limit, onSnapshot, orderBy, query, Timestamp } from "firebase/firestore"
import { db } from "../config/firebase"


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

  const addEvent = async (date, band, city, location, type, notes) => {
    if (!user) return
    setLoading(true)
    setError(null)
    try {
      const eventData = { userId: user.uid, date, band, city, location, type, notes, createdAt: Timestamp.now() }
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
  return { events, loading, error, fetchEvents, addEvent, deleteEvent }
}
export default useEvents