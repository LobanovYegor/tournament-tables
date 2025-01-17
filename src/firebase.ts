import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAwzmlc6j_p4JHoKhjV_5piTpjPqNJjPDM',
  authDomain: 'tournament-tables-ab407.firebaseapp.com',
  projectId: 'tournament-tables-ab407',
  storageBucket: 'tournament-tables-ab407.firebasestorage.app',
  messagingSenderId: '491187020529',
  appId: '1:491187020529:web:db4c7d962ff2a076cb3f50',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
