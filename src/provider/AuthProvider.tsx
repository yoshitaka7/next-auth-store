import { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import firebase from 'firebase/compat/app';
import { auth } from "../firebase";
import { getUserInfo } from "../utils/auth";

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<firebase.firestore.DocumentData | undefined>(undefined);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        getUserInfo(user.uid)
          .then((res) => {
            if (res) {
              delete res.created_at
              setUser(res)
            }
          })
      } else {
        setUser(undefined)
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
};