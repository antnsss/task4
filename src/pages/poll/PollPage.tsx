import { useParams, useNavigate } from 'react-router-dom'
import usePoll from '../../hooks/usePoll'
import { useState} from 'react'
import { vote, getAllPolls } from '../../lib/polls'

export default function PollPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { poll, loading, setPoll } = usePoll(id)
  const [selected, setSelected] = useState<number | null>(null)
  const [questionIndex, setQuestionIndex] = useState(0)

  if (loading) return <div>Loading...</div>
  if (!poll) return <div>Poll not found</div>

  const q = poll.questions[questionIndex]

  const handleSubmit = async () => {
    if (selected === null) return alert('Choose option')
    
    await vote(poll.id!, questionIndex, selected)

    const refreshed = await (await import('../../lib/polls')).getPoll(poll.id!)
    setPoll(refreshed)

    const correct = q.correctOptionIndex === selected
    alert(`Your answer is ${correct ? 'correct' : 'incorrect'}`)

    setSelected(null)

    if (questionIndex < poll.questions.length - 1) {
      setQuestionIndex(questionIndex + 1)
    } else {
    
      const allPolls = await getAllPolls()
      const currentIndex = allPolls.findIndex(p => p.id === poll.id)
      const nextPoll = allPolls[currentIndex + 1]
      if (nextPoll) {
        navigate(`/poll/${nextPoll.id}`)
      } else {
        alert('You have completed all available polls!')
        navigate('/') 
      }
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-3">{poll.title}</h1>
      <p className="mb-4">{q.text}</p>
      <div className="space-y-2">
        {q.options.map((opt, i) => (
          <label key={i} className="flex items-center space-x-2">
            <input
              type="radio"
              name="opt"
              checked={selected === i}
              onChange={() => setSelected(i)}
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>
      <div className="mt-4">
        <button onClick={handleSubmit} className="px-4 py-2 rounded bg-green-600 text-white">
          Submit
        </button>
      </div>
    </div>
  )
}
