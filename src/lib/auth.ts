import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import app from './firebase'


const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

export { auth, googleProvider }

export async function signInWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider)
  return result.user
}

export async function signInEmail(email: string, password: string) {
  const r = await signInWithEmailAndPassword(auth, email, password)
  return r.user
}

export async function registerEmail(email: string, password: string) {
  const r = await createUserWithEmailAndPassword(auth, email, password)
  return r.user
}

export async function signOutUser() {
  await signOut(auth)
}
