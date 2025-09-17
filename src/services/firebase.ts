import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Configuração do Firebase - TECSOFT
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyAmqbgBfed343gFcdXyFWbhzSv_3OoOPKg",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "tecsoft-7cf2d.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "tecsoft-7cf2d",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "tecsoft-7cf2d.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "671203567540",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:671203567540:web:tecsoft-app"
};

// Inicializar Firebase (evitar múltiplas inicializações)
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Serviços
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Configurações específicas para produção
if (process.env.NODE_ENV === 'production') {
  console.log('Firebase: Configuração de produção ativa');
} else {
  console.log('Firebase: Configuração de desenvolvimento ativa');
}

// Log de inicialização
console.log('Firebase: Inicializado com sucesso');
console.log('Firebase: Project ID:', firebaseConfig.projectId);
console.log('Firebase: Auth Domain:', firebaseConfig.authDomain);

export default app;
