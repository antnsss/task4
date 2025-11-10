// src/pages/stats/StatsPage.tsx
import { useParams } from 'react-router-dom'
import usePoll from '../../hooks/usePoll'
import { PieChart, Pie, Tooltip, Cell } from 'recharts'

export default function StatsPage() {
  const { id } = useParams()
  const { poll, loading } = usePoll(id)

  if (loading) return <div>Loading...</div>
  if (!poll) return <div>Poll not found</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Statistics — {poll.title}</h1>
      {poll.questions.map((q, idx) => {
        const data = q.options.map((o, i) => ({
          name: o + (i === q.correctOptionIndex ? ' ✅' : ''),
          value: q.votes?.[i] ?? 0,
        }))

        return (
          <div key={idx} className="bg-white p-4 rounded shadow mb-4">
            <h2 className="font-semibold mb-2">{q.text}</h2>
            <PieChart width={400} height={300}>
              <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} label />
              <Tooltip />
              {data.map((_, i) => (
                <Cell key={i} />
              ))}
            </PieChart>
          </div>
        )
      })}
    </div>
  )
}
