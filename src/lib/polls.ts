import { collection, addDoc, getDoc, getDocs, doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import type { Poll } from '../types/poll'

import { auth } from './auth'
import { db } from './firebase'

const pollsCol = collection(db, 'polls')

// Створити новий опитувальник
export async function createPoll(poll: Omit<Poll, 'id' | 'createdAt' | 'ownerId'>) {
  if (!auth.currentUser) throw new Error('User not logged in')

  const ref = await addDoc(pollsCol, {
    ...poll,
    ownerId: auth.currentUser.uid,
    createdAt: serverTimestamp(),
  })

  return ref.id
}

// Отримати один опитувальник
export async function getPoll(id: string) {
  const d = await getDoc(doc(db, 'polls', id))
  return d.exists() ? ({ id: d.id, ...d.data() } as Poll) : null
}

// Отримати всі опитувальники
export async function getAllPolls() {
  const snap = await getDocs(pollsCol)
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Poll))
}

// Проголосувати
export async function vote(pollId: string, answers: { questionIndex: number; optionIndex: number }[]) {
  const ref = doc(db, 'polls', pollId)
  const p = await getDoc(ref)
  if (!p.exists()) throw new Error('Poll not found')

  const data = p.data() as any
  const questions = data.questions as any[]

  answers.forEach(({ questionIndex, optionIndex }) => {
    if (!questions[questionIndex]) throw new Error('Question not found')
    questions[questionIndex].votes = questions[questionIndex].votes || Array(questions[questionIndex].options.length).fill(0)
    questions[questionIndex].votes[optionIndex] = (questions[questionIndex].votes[optionIndex] || 0) + 1
  })

  await updateDoc(ref, { questions })
}
