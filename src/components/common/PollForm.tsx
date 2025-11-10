// src/components/common/PollForm.tsx
import { useState } from 'react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import type { Question } from '../../types/poll'

interface PollFormProps {
  onSubmit: (poll: { title: string; questions: Question[] }) => void
}

export default function PollForm({ onSubmit }: PollFormProps) {
  const [title, setTitle] = useState('')
  const [questions, setQuestions] = useState<Question[]>([
    { text: '', options: ['', ''], votes: [], correctOptionIndex: undefined }
  ])

  // Додати ще одне питання
  const addQuestion = () =>
    setQuestions([
      ...questions,
      { text: '', options: ['', ''], votes: [], correctOptionIndex: undefined }
    ])

  // Змінити текст питання
  const setQuestionText = (index: number, text: string) => {
    setQuestions(qs =>
      qs.map((q, i) => (i === index ? { ...q, text } : q))
    )
  }

  // Додати варіант відповіді
  const addOption = (qIndex: number) => {
    setQuestions(qs =>
      qs.map((q, i) =>
        i === qIndex ? { ...q, options: [...q.options, ''] } : q
      )
    )
  }

  // Змінити варіант відповіді
  const setOption = (qIndex: number, oIndex: number, value: string) => {
    setQuestions(qs =>
      qs.map((q, i) =>
        i === qIndex
          ? {
              ...q,
              options: q.options.map((o, idx) => (idx === oIndex ? value : o))
            }
          : q
      )
    )
  }

  // Встановити правильну відповідь
  const setCorrectOption = (qIndex: number, oIndex: number) => {
    setQuestions(qs =>
      qs.map((q, i) => (i === qIndex ? { ...q, correctOptionIndex: oIndex } : q))
    )
  }

  // Надіслати форму
  const handleSubmit = () => {
    if (!title.trim()) return alert('Enter poll title')

    const cleaned = questions.map(q => ({
      ...q,
      options: q.options.filter(Boolean), // прибираємо пусті опції
      votes: q.options.filter(Boolean).map(() => 0)
    }))

    onSubmit({ title, questions: cleaned })

    // Очистити форму
    setTitle('')
    setQuestions([{ text: '', options: ['', ''], votes: [], correctOptionIndex: undefined }])
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block font-medium">Poll title</label>
        <Input value={title} onChange={setTitle} placeholder="Title" />
      </div>

      {questions.map((q, qi) => (
        <div key={qi} className="border p-4 rounded space-y-2">
          <label className="block font-medium">Question {qi + 1}</label>
          <Input value={q.text} onChange={(v: string) => setQuestionText(qi, v)} placeholder="Question text" />

          <div className="space-y-1">
            {q.options.map((opt, oi) => (
              <div key={oi} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={`correct-${qi}`}
                  checked={q.correctOptionIndex === oi}
                  onChange={() => setCorrectOption(qi, oi)}
                />
                <Input value={opt} onChange={(v: string) => setOption(qi, oi, v)} placeholder={`Option ${oi + 1}`} />
              </div>
            ))}
            <button
              type="button"
              onClick={() => addOption(qi)}
              className="text-blue-600 text-sm mt-1"
            >
              + Add option
            </button>
          </div>
        </div>
      ))}

      <div className="flex space-x-2">
        <Button onClick={addQuestion}>+ Add Question</Button>
        <Button onClick={handleSubmit}>Create Poll</Button>
      </div>
    </div>
  )
}
