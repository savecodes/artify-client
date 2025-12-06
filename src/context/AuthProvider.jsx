import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile as firebaseUpdateProfile,
  updateEmail as firebaseUpdateEmail,
  updatePassword as firebaseUpdatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firebase/Firebase.config";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create User
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Send Verification Email
  const sendVerifyEmail = (currentUser) => {
    return sendEmailVerification(currentUser);
  };

  // const sendVerifyEmail = () => {
  //   if (!user) return;
  //   return sendEmailVerification(user);
  // };

  // SignIn With Google
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // SignIn With Email & Password
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // SignOut User
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Update Profile
  const updateUserProfile = (data) => {
    if (!user) return;
    return firebaseUpdateProfile(user, data);
  };

  // Update Email
  const updateUserEmail = (newEmail) => {
    if (!user) return;
    return firebaseUpdateEmail(user, newEmail);
  };

  // Update Password
  const updateUserPassword = (newPassword) => {
    if (!user) return;
    return firebaseUpdatePassword(user, newPassword);
  };

  // Reauthenticate
  const reauthenticateUser = (currentPassword) => {
    if (!user) return;
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return reauthenticateWithCredential(user, credential);
  };

  // User Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authData = {
    user,
    setUser,
    loading,
    createUser,
    sendVerifyEmail,
    signInUser,
    signInWithGoogle,
    logOut,
    updateUserProfile,
    updateUserEmail,
    updateUserPassword,
    reauthenticateUser,
  };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
