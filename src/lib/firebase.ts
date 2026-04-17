import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// As variáveis de ambiente garantem que suas chaves não fiquem expostas no GitHub
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Padrão Singleton: Só inicializa se não existir nenhum app rodando
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Exportando os serviços que vamos usar nas nossas telas
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };