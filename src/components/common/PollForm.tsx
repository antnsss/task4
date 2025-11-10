import { useState } from 'react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import type { Question } from '../../types/poll'

export default function PollForm({
  onSubmit,
}: {
  onSubmit: (poll: { title: string; questions: Question[] }) => void
}) {
  const [title, setTitle] = useState('')
  const [questions, setQuestions] = useState<Question[]>([
    { text: '', options: ['', ''], votes: [], correctOptionIndex: undefined },
  ])

  const addQuestion = () =>
    setQuestions([
      ...questions,
      { text: '', options: ['', ''], votes: [], correctOptionIndex: undefined },
    ])

  const setQuestionText = (index: number, text: string) => {
    setQuestions((qs) => qs.map((q, i) => (i === index ? { ...q, text } : q)))
  }

  const addOption = (qIndex: number) => {
    setQuestions((qs) =>
      qs.map((q, i) =>
        i === qIndex ? { ...q, options: [...q.options, ''] } : q
      )
    )
  }

  const setOption = (qIndex: number, oIndex: number, value: string) => {
    setQuestions((qs) =>
      qs.map((q, i) =>
        i === qIndex
          ? {
              ...q,
              options: q.options.map((o, idx) => (idx === oIndex ? value : o)),
            }
          : q
      )
    )
  }

  const setCorrectOption = (qIndex: number, oIndex: number) => {
    setQuestions((qs) =>
      qs.map((q, i) => (i === qIndex ? { ...q, correctOptionIndex: oIndex } : q))
    )
  }

  const handleSubmit = () => {
    const cleaned = questions.map((q) => ({
      ...q,
      options: q.options.filter(Boolean),
      votes: q.options.filter(Boolean).map(() => 0),
    }))
    onSubmit({ title, questions: cleaned })
    setTitle('')
    setQuestions([{ text: '', options: ['', ''], votes: [], correctOptionIndex: undefined }])
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block font-medium">Poll title</label>
        <Input value={title} onChange={(v: string) => setTitle(v)} placeholder="Title" />
      </div>

      {questions.map((q, qi) => (
        <div key={qi} className="border p-4 rounded space-y-2">
          <label className="block font-medium">Question {qi + 1}</label>
          <Input
            value={q.text}
            onChange={(v: string) => setQuestionText(qi, v)}
            placeholder="Question text"
          />

          <div className="space-y-1">
            {q.options.map((opt, oi) => (
              <div key={oi} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={`correct-${qi}`}
                  checked={q.correctOptionIndex === oi}
                  onChange={() => setCorrectOption(qi, oi)}
                />
                <Input
                  value={opt}
                  onChange={(v: string) => setOption(qi, oi, v)}
                  placeholder={`Option ${oi + 1}`}
                />
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
