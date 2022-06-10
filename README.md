# Next Firebase Authentication/Firebase Store  CRUD
<p align="center">
  <a href="https://www.typescriptlang.org/">
    <img src="https://user-images.githubusercontent.com/89970444/173063032-58f7ea37-f0ed-46c2-98d9-344170beaf98.svg" height="45px">
  </a>
  <a href="https://nextjs.org/">
    <img src="https://user-images.githubusercontent.com/89970444/173066516-bbac7231-2c86-499c-9369-cbd3a4a83238.svg" height="50px">
  </a>
  <a href="https://firebase.google.com/?hl=ja">
    <img src="https://user-images.githubusercontent.com/89970444/173061737-e0abb641-d8e5-40cf-9266-e2ec203388e9.png" height="50px">
  </a>
</p>
 

## Getting Started
`git clone`  

↓

create firebase.ts under src/db

```
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'

const firebaseConfig = {
//copy SDK Snippet from firebase console
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
export const FirebaseTimestamp = firebase.firestore.Timestamp;
```

↓

`npm run dev`
