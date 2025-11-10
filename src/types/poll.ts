export interface Question {
  text: string
  options: string[]
  votes: number[]           // кількість голосів для кожної опції
  correctOptionIndex?: number // індекс правильної відповіді
}

export interface Poll {
  id?: string
  title: string
  questions: Question[]
  createdAt: { seconds: number; nanoseconds: number } | string | number
  ownerId?: string          // id користувача, який створив опитування
}
