import { auth, db, FirebaseTimestamp } from '../firebase'
import { User } from '../@types/global';

//アカウント作成
export const createAccount = async (name:string, email:string, password:string):Promise<void> => {
  return auth.createUserWithEmailAndPassword(email, password)
    .then (result => {
      const user = result.user
      if (user) {
        const uid = user.uid
        const timestamp = FirebaseTimestamp.now()
        const userInitialData = {
          name: name,
          email: email,
          created_at: timestamp,
          uid: uid,
        }
        db.collection('users').doc(uid).set(userInitialData)
      }
    })
};

//サインイン
export const signIn = async (email:string, password:string) => {
  return auth.signInWithEmailAndPassword( email, password )
};

//サインアウト
export const signOut = () => {
  auth.signOut();
};

//storeのuser情報取得
export const getUserInfo = async (uid:string):Promise<User> => {
  const userRef = await db.collection('users').doc(uid).get()
  const data = userRef.data();
  return data as User
}