import { useState } from 'react'
import { registerEmail } from '../../lib/auth'
import { useNavigate } from 'react-router-dom'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const nav = useNavigate()

  const handleRegister = async () => {
    try {
      await registerEmail(email, password)
      nav('/')
    } catch (err) {
      alert((err as Error).message)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      <input className="border p-2 w-full mb-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="border p-2 w-full mb-2" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <div>
        <button onClick={handleRegister} className="px-4 py-2 bg-green-600 text-white rounded">Create account</button>
      </div>
    </div>
  )
}
