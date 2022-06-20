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

  async function signup(email, password) {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(user.user);
    } catch (error) {
      return error.code;
    }
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
        if (user.emailVerified) {
          setLoggedHidden(false);
        }
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