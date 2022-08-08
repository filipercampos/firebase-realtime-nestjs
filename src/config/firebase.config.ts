import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const logger = new Logger('firebase.init');
const configService = new ConfigService();
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: configService.get('FIREBASE_API_KEY'),
  authDomain: configService.get('FIREBASE_AUTH_DOMAIN'),
  projectId: configService.get('FIREBASE_PROJECT_ID'),
  storageBucket: configService.get('FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: configService.get('FIREBASE_MESSAGING_SENDER_ID'),
  appId: configService.get('FIREBASE_APP_ID'),
  measurementId: configService.get('FIREBASE_MEASUREMENT_ID'),
};
//firebase auth
const email = configService.get('FIREBASE_USER_EMAIL');
const password = configService.get('FIREBASE_USER_PASSWORD');
/**
 * Initialize the Firebase app
 */
export async function firebaseInit() {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  await signInWithEmailAndPassword(auth, email, password).then(function (
    cred: any,
  ) {
    logger.debug('Firebase token', cred.user['accessToken']);
    logger.debug('Firebase uuid', cred.user.uid);
  });
}
