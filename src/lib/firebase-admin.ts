
import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (serviceAccountString) {
    try {
      const serviceAccount = JSON.parse(serviceAccountString);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`,
      });
    } catch (e) {
      console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT:', e);
    }
  } else {
    // This fallback is for local development or environments without full admin access.
    // Note: Certain admin actions will fail if credentials are not provided.
    console.warn("FIREBASE_SERVICE_ACCOUNT not found. Initializing Firebase Admin SDK without credentials. Some functionality may be limited.");
    admin.initializeApp({
        databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`,
    });
  }
}

export const adminDb = admin.firestore();
export const adminAuth = admin.auth();
