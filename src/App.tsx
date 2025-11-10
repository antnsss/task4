import { Routes, Route } from 'react-router-dom'
import MainLayout from './components/layouts/MainLayout'
import HomePage from './pages/home/HomePage'
import CreatePage from './pages/create/CreatePage'
import PollPage from './pages/poll/PollPage'
import StatsPage from './pages/stats/StatsPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import ProtectedRoute from './components/common/ProtectedRoute'

export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<ProtectedRoute><CreatePage /></ProtectedRoute>} />
        <Route path="/poll/:id" element={<PollPage />} />
        <Route path="/stats/:id" element={<StatsPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
      </Routes>
    </MainLayout>
  )
}
