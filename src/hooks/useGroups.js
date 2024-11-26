import { useState } from "react"
import useAuth from "./useAuth"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../config/firebase"

const useGroups = () => {
  const { user } = useAuth()
  const [group, setGroup] = useState(null)
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

  const toggleGroupActive = async (value) => {
    await updateDoc(doc(db, 'groups', user.uid), { active: !value })
  }

  return { group, fetchGroup, toggleGroupActive }
}

export default useGroups