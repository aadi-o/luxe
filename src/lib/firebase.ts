import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const isMock = firebaseConfig.apiKey === 'PREVIEW_MODE' || !firebaseConfig.apiKey;

function getInitApp() {
  if (isMock) return null;
  if (getApps().length > 0) return getApp();
  try {
    return initializeApp(firebaseConfig as any);
  } catch (e) {
    return null;
  }
}

export const app = getInitApp();
export const auth = app ? getAuth(app) : ({} as any);
// @ts-ignore
export const db = app ? getFirestore(app, firebaseConfig.firestoreDatabaseId || '(default)') : ({} as any);
export { isMock };
