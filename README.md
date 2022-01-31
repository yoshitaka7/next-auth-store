# Next Firebase Authentication/Firebase Store 認証/CRUD処理

## Getting Started
`git clone`
↓

src/db配下にfirebase.ts作成

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