import { useState } from "react"
import useAuth from "./useAuth"
import { arrayUnion, collection, doc, getDoc, getDocs, setDoc, Timestamp, updateDoc } from "firebase/firestore"
import { db } from "../config/firebase"

const useGroups = () => {
  const { user } = useAuth()
  const [group, setGroup] = useState(null)
  const [users, setUsers] = useState(null)

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

  const fetchUsers = async () => {
    try {
      const groupsSnapshot = await getDocs(collection(db, 'groups'))
      const users = groupsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setUsers(users)
    } catch (error) {
      
    }
  }
  const connectUsers = async(userLinkedFrom, userLinkedTo) => {
    try {
      const groupsSnapshot = await getDocs(collection(db, 'groups'))
      const groups = groupsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

      const displayUser = groups.find(group => group.displayName === userLinkedFrom)
      const targetGroupId = groups.find(group => group.displayName === userLinkedTo)?.id

      if (!displayUser || !targetGroupId) 
        return { success: false, message: 'Benutzer nicht gefunden'}

      const updateRef = doc(db, 'groups', targetGroupId)
      await updateDoc(updateRef, { 
        displayUser: arrayUnion({
          id: displayUser.id,
          name: displayUser.displayName
        })
      })

      return { success: true, message: 'Erfolgreich verknüpft'}
    } catch (error) {
      return { success: false, message: error}
    }
  }

  return { group, users, fetchUsers, createGroup, fetchGroup, connectUsers }
}

export default useGroups