/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// Config parsed from firebase-applet-config.json
const firebaseConfig = {
  apiKey: "AIzaSyA-oxOm_Ton656wT805BrKu2oGvkgv4Nzw",
  authDomain: "modified-rhino-c2t1j.firebaseapp.com",
  projectId: "modified-rhino-c2t1j",
  storageBucket: "modified-rhino-c2t1j.firebasestorage.app",
  messagingSenderId: "517411762887",
  appId: "1:517411762887:web:6570fda0d19ced1d6cc4e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

/**
 * Saves user data (such as completed lessons) to Firestore
 */
export async function saveUserData(userId: string, data: { completedLessons: string[]; email?: string }) {
  try {
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, {
      ...data,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    console.error("Error saving user data to Firestore:", error);
  }
}

/**
 * Loads user data from Firestore
 */
export async function loadUserData(userId: string): Promise<{ completedLessons: string[] } | null> {
  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const data = userSnap.data();
      return {
        completedLessons: data.completedLessons || []
      };
    }
    return null;
  } catch (error) {
    console.error("Error loading user data from Firestore:", error);
    return null;
  }
}
