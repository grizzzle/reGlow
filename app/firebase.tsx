import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDaODBb8Tw-OOK_JR17liU9rAZetd8-lsg',
  authDomain: 'reglow-42b53.firebaseapp.com',
  projectId: 'reglow-42b53',
  storageBucket: 'reglow-42b53.appspot.com',
  messagingSenderId: '1058454871392',
  appId: '1:1058454871392:web:3bd326e98099d32c9e9205',
  measurementId: 'G-07C6QLFK3L',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };
