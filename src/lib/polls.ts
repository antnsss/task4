import { collection, addDoc, getDoc, getDocs, doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import type { Poll } from '../types/poll'
import { db } from './firebase'

const pollsCol = collection(db, 'polls')

// Створити новий опитувальник
export async function createPoll(poll: Omit<Poll, 'id' | 'createdAt' | 'ownerId'>, ownerId: string) {
  const ref = await addDoc(pollsCol, { ...poll, ownerId, createdAt: serverTimestamp() })
  return ref.id
}

// Отримати один опитувальник
export async function getPoll(id: string) {
  const snap = await getDoc(doc(db, 'polls', id))
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as Poll) : null
}

// Отримати всі опитувальники
export async function getAllPolls() {
  const snap = await getDocs(pollsCol)
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Poll))
}

// Проголосувати
export async function vote(pollId: string, questionIndex: number, optionIndex: number) {
  const ref = doc(db, 'polls', pollId)
  const snap = await getDoc(ref)
  if (!snap.exists()) throw new Error('Poll not found')

  const data = snap.data() as Poll
  const questions = data.questions

  if (!questions[questionIndex]) throw new Error('Question not found')

  questions[questionIndex].votes = questions[questionIndex].votes || Array(questions[questionIndex].options.length).fill(0)
  questions[questionIndex].votes[optionIndex] += 1

  await updateDoc(ref, { questions })
}
