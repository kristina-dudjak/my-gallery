import React, { useContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword, signOut, sendEmailVerification, sendPasswordResetEmail, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loggedHidden, setLoggedHidden] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }
  function verifyEmail() {
    return sendEmailVerification(currentUser);
  }
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedHidden(false);
      } else {
        setLoggedHidden(true);
      }
      setCurrentUser(user);
      setLoading(false);
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    verifyEmail,
    resetPassword,
    updatePassword,
    loggedHidden
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}