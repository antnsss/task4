import { useParams, useNavigate } from 'react-router-dom'
import usePoll from '../../hooks/usePoll'
import { useState } from 'react'
import { vote, getAllPolls } from '../../lib/polls'
import { 
  Typography, 
  Radio, 
  RadioGroup, 
  FormControl, 
  FormControlLabel, 
  Button, 
  Box 
} from '@mui/material'

export default function PollPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { poll, loading, setPoll } = usePoll(id)
  const [selected, setSelected] = useState<number | null>(null)
  const [questionIndex, setQuestionIndex] = useState(0)

  if (loading) return <Typography>Loading...</Typography>
  if (!poll) return <Typography>Poll not found</Typography>

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
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        {poll.title}
      </Typography>
      <Typography variant="h6" mb={3}>
        {q.text}
      </Typography>

      <FormControl component="fieldset">
        <RadioGroup
          value={selected !== null ? selected.toString() : ''}
          onChange={(e) => setSelected(Number(e.target.value))}
        >
          {q.options.map((opt, i) => (
            <FormControlLabel
              key={i}
              value={i.toString()}
              control={<Radio />}
              label={opt}
            />
          ))}
        </RadioGroup>
      </FormControl>

      <Box mt={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Box>
  )
}
