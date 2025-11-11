// src/pages/stats/StatsPage.tsx
import { useParams } from 'react-router-dom'
import usePoll from '../../hooks/usePoll'
import { PieChart, Pie, Tooltip, Cell } from 'recharts'
import { Box, Typography, Paper } from '@mui/material'

export default function StatsPage() {
  const { id } = useParams()
  const { poll, loading } = usePoll(id)

  if (loading) return <Typography>Loading...</Typography>
  if (!poll) return <Typography>Poll not found</Typography>

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Statistics — {poll.title}
      </Typography>

      {poll.questions.map((q, idx) => {
        const data = q.options.map((o, i) => ({
          name: o + (i === q.correctOptionIndex ? ' ✅' : ''),
          value: q.votes?.[i] ?? 0,
        }))

        return (
          <Paper key={idx} elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" mb={2}>
              {q.text}
            </Typography>
            <PieChart width={400} height={300}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {data.map((_, i) => (
                  <Cell key={i} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </Paper>
        )
      })}
    </Box>
  )
}
