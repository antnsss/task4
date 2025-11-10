// src/pages/poll/PollPage.tsx
import { useParams } from 'react-router-dom'
import usePoll from '../../hooks/usePoll'
import { useState } from 'react'
import { vote } from '../../lib/polls'

export default function PollPage() {
  const { id } = useParams()
  const { poll, loading, setPoll } = usePoll(id)

  const [questionIndex, setQuestionIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [wrongCount, setWrongCount] = useState(0)
  const [finished, setFinished] = useState(false)

  if (loading) return <div>Loading...</div>
  if (!poll) return <div>Poll not found</div>

  const q = poll.questions[questionIndex]

  const handleSubmit = async () => {
    if (selected === null) return alert('Choose option')

    // Голосування у Firestore
    await vote(poll.id!, [{ questionIndex, optionIndex: selected }])

    // Перевірка правильності
    if (q.correctOptionIndex === selected) {
      setCorrectCount((c) => c + 1)
    } else {
      setWrongCount((w) => w + 1)
    }

    setSelected(null)

    // Перехід до наступного питання або завершення
    if (questionIndex < poll.questions.length - 1) {
      setQuestionIndex((i) => i + 1)
    } else {
      setFinished(true)
    }

    // Оновлення локального стану опитування
    const refreshed = await (await import('../../lib/polls')).getPoll(poll.id!)
    setPoll(refreshed)
  }

  if (finished) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-3">{poll.title}</h1>
        <h2 className="text-xl mb-2">Finished!</h2>
        <p>Correct answers: {correctCount}</p>
        <p>Wrong answers: {wrongCount}</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-3">{poll.title}</h1>
      <p className="mb-4">{q.text}</p>
      <div className="space-y-2">
        {q.options.map((opt: string, i: number) => (
          <label key={i} className="flex items-center space-x-2">
            <input
              type="radio"
              name="opt"
              checked={selected === i}
              onChange={() => setSelected(i)}
            />
            <span>{opt}</span>
            <span className="ml-auto text-sm text-gray-500">{q.votes?.[i] ?? 0} votes</span>
          </label>
        ))}
      </div>
      <div className="mt-4">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 rounded bg-green-600 text-white"
        >
          Submit
        </button>
      </div>
    </div>
  )
}
