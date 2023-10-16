import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { app } from './firebase.js';

export const auth = getAuth(app);

// create new users
export function newUser(name, email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(async () => {
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
    });
}

export function displayName() {
  const user = auth.currentUser;
  if (user) {
    return user.displayName;
  }
  return 'default';
}

// Login
export const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

// LogOut
export const logOut = () => signOut(auth);
