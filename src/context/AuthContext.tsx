import React from "react";
import firebase from 'firebase/compat/app';

type AuthContextProps = {
  user: firebase.firestore.DocumentData | undefined
};

//contextオブジェクト(user)を作成
export const AuthContext = React.createContext<AuthContextProps>({
  user: undefined
});