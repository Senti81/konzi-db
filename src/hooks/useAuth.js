import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, provider } from "../config/firebase";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)
  const [isAdmin, setAdmin] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        setAdmin(process.env.REACT_APP_ADMIN_UID === currentUser.uid)
      } else {
        setUser(null);
        setError(true)
      }
      setLoading(false);  
    });

    return () => unsubscribe();
  }, []);

  const login = async() => {
    setError(null)
    try {
      await signInWithPopup(auth, provider)
    } catch (e) {
      setError('Fehler beim Anmelden:', e.message)
    } finally {
      setLoading(false)
    }
  }

  const logout = async() => {
    setError(null)
    try {
      await signOut(auth)
      console.log('Erfolgreich abgemeldet')
    } catch (e) {
      setError('Fehler beim Abmelden:', e.message)
    } finally {
      setLoading(false)
    }
  }

  return { user, login, logout, isAdmin, loading, error };
};

export default useAuth;
