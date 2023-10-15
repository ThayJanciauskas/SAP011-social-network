/* eslint-disable max-len */
// All of these functions has been exported to login.js
import {
  getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, updateProfile,
} from 'firebase/auth';
import { app } from './firebase.js';

export const auth = getAuth(app);

// create new users
export const newUser = (email, password) => createUserWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
  const user = userCredential.user;
  return updateProfile(user);
});

// Login
export const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

// LogOut
export const logOut = () => signOut(auth);

// const Auth = getAuth();
// signInWithEmailAndPassword(Auth, email, password)
// .then((userCredential) => {
/// Signed in
// const user = userCredential.user;
// ...
// })
// .catch((error) => {
// const errorCode = error.code;
//  const errorMessage = error.message;
// });

// const logout = getAuth();
// signOut(auth).then(() => {
// Sign-out successful.
// }).catch((error) => {
// An error happened.
// });

// export function login(email, password) {
// const auth = getAuth();
// return signInWithEmailAndPassword(auth, email, password);
// }

// export function cadastrar(email, password) {
// const auth = getAuth();
// return createUserWithEmailAndPassword(auth, email, password);
// }

// export function logout() {
// const bye = getAuth();
// return signOut(auth);
// }
