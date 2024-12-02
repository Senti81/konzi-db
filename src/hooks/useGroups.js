import { useState } from "react"
import useAuth from "./useAuth"
import { arrayUnion, collection, doc, getDoc, getDocs, setDoc, Timestamp, updateDoc } from "firebase/firestore"
import { db } from "../config/firebase"

const useGroups = () => {
  const { user } = useAuth()
  const [group, setGroup] = useState(null)
  const [groups, setGroups] = useState([])

  const createGroup = async() => {
    if (!user) return
    try {
      const docRef = doc(db, 'groups', user.uid)
      const docSnap = await getDoc(docRef)
      if (!docSnap.exists()){
        await setDoc(docRef, {
          displayName: user.displayName,
          displayUser: [
            { name: user.displayName,
              id: user.uid
            }
          ],
          createdAt: Timestamp.now()
        })        
      }
    } catch (error) {
      console.error(error)
    }
  }

  const fetchGroup = async() => {
    if (!user) return
    try {
      const docRef = doc(db, 'groups', user.uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const result = docSnap.data()
        setGroup(result)
        return result
      }
    } catch (error) {
      console.error("Fehler beim Abrufen der Gruppe: ", error.message)
      return null
    }
  }

  const connectUsers = async(userLinkedFrom, userLinkedTo) => {
    try {
      const groups = await getDocs(collection(db, 'groups'))
      let displayUser = null
      let id = null
      groups.forEach(doc => {
        if (userLinkedFrom === doc.data().displayName) {
          displayUser = { id: doc.id, name: doc.data().displayName }
        }
        if (userLinkedTo === doc.data().displayName) {
          id = doc.id
        }
      })
      if (!displayUser || !id) return { success: false, message: 'Benutzer nicht gefunden'}

      const updateRef = doc(db, 'groups', id)
      await updateDoc(updateRef, { displayUser: arrayUnion(displayUser) })
      return { success: true, message: 'Erfolgreich verknüpft'}
    } catch (error) {
      return { success: false, message: error}
    }
  }

  return { group, groups, createGroup, fetchGroup, connectUsers }
}

export default useGroups