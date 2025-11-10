import { useEffect, useState } from 'react'
import { getAllPolls } from '../../lib/polls'
import { Link } from 'react-router-dom'

export default function HomePage() {
  const [polls, setPolls] = useState<any[]>([])

  useEffect(() => {
    async function load() {
      const data = await getAllPolls()
      setPolls(data)
    }
    load()
  }, [])

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">All Polls</h1>

      {polls.length === 0 ? (
        <p>No polls yet.</p>
      ) : (
        <div className="space-y-4">
          {polls.map((p) => (
            <div
              key={p.id}
              className="p-4 bg-white rounded shadow flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{p.title}</h3>
                {p.questions?.map((q: any, i: number) => (
                  <p key={i} className="text-sm text-gray-500">{q.text}</p>
                ))}
              </div>
              <div className="space-x-2">
                <Link to={`/poll/${p.id}`} className="text-sm text-blue-600">Take</Link>
                <Link to={`/stats/${p.id}`} className="text-sm text-gray-600">Stats</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
