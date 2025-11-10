import { useParams } from 'react-router-dom'
import usePoll from '../../hooks/usePoll'
import { useState } from 'react'
import { vote } from '../../lib/polls'

export default function PollPage() {
  const { id } = useParams()
  const { poll, loading, setPoll } = usePoll(id)
  const [selected, setSelected] = useState<{ [key: number]: number }>({})

  if (loading) return <div>Loading...</div>
  if (!poll) return <div>Poll not found</div>

  const handleSubmit = async () => {
    for (const [qi, oi] of Object.entries(selected)) {
      await vote(poll.id!, Number(qi), oi)
    }
    const refreshed = await (await import('../../lib/polls')).getPoll(poll.id!)
    setPoll(refreshed)
    alert('Thanks for your vote!')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{poll.title}</h1>

      {poll.questions.map((q, qi) => (
        <div key={qi} className="mb-6">
          <p className="font-semibold mb-2">{q.text}</p>
          <div className="space-y-2">
            {q.options.map((opt, i) => (
              <label key={i} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={`question-${qi}`}
                  checked={selected[qi] === i}
                  onChange={() =>
                    setSelected((s) => ({ ...s, [qi]: i }))
                  }
                />
                <span>{opt}</span>
                <span className="ml-auto text-sm text-gray-500">
                  {q.votes?.[i] ?? 0} votes
                </span>
              </label>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="px-4 py-2 rounded bg-green-600 text-white"
      >
        Submit
      </button>
    </div>
  )
}
