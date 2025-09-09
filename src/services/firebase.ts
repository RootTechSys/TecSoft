import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Configuração do Firebase - TECSOFT
const firebaseConfig = {
  apiKey: "AIzaSyAmqbgBfed343gFcdXyFWbhzSv_3OoOPKg",
  authDomain: "tecsoft-7cf2d.firebaseapp.com",
  projectId: "tecsoft-7cf2d",
  storageBucket: "tecsoft-7cf2d.appspot.com",
  messagingSenderId: "671203567540",
  appId: "1:671203567540:web:tecsoft-app"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Serviços
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
