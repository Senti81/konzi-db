import { useState } from "react"
import useAuth from "./useAuth"
import { collection, doc, getDoc, getDocs, setDoc, Timestamp, updateDoc } from "firebase/firestore"
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
          active: false,
          linkedIds: [user.uid],
          createdAt: Timestamp.now()
        })        
      }
    } catch (error) {
      console.error(error)
    }
  }

  const fetchGroups = async() => {
    const groups = await getDocs(collection(db, 'groups'))

    const result = []
    groups.forEach(doc => {
      result.push({
        id: doc.id,
        active: doc.data().active,
        displayName: doc.data().displayName,
        linkedIds: doc.data().linkedIds
      })
    })
    setGroups(result)
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

  const toggleGroupActive = async (value) => {
    await updateDoc(doc(db, 'groups', user.uid), { active: !value })
  }

  return { group, groups, createGroup, fetchGroup, fetchGroups, toggleGroupActive }
}

export default useGroups