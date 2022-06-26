import React, { useContext, useState, useEffect } from "react";
import { EmailAuthProvider, createUserWithEmailAndPassword, signOut, sendEmailVerification, sendPasswordResetEmail, onAuthStateChanged, signInWithEmailAndPassword, reauthenticateWithCredential, deleteUser, updatePassword } from "firebase/auth";
import { auth } from "../firebase";
import { db } from "../firebase";
import { ref, remove } from "firebase/database";

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
      await verifyEmail(user.user);
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

  function verifyEmail(user) {
    return sendEmailVerification(user);
  }
  
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  async function updateUsersPassword(oldPassword, newPassword) {
    const credential = EmailAuthProvider.credential(currentUser.email, oldPassword);
    try {
      await reauthenticateWithCredential(currentUser, credential);
      await updatePassword(currentUser, newPassword);
    } catch (error) {
      return error.code;
    }
  }

  async function deleteAccout(password) {
    const credential = EmailAuthProvider.credential(currentUser.email, password);
    try {
      await reauthenticateWithCredential(currentUser, credential);
      await remove(ref(db, `users/${currentUser.uid}`));
      await deleteUser(currentUser);
    } catch (error) {
      return error.code;
    }
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

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    verifyEmail,
    resetPassword,
    updateUsersPassword,
    deleteAccout,
    loggedHidden
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}