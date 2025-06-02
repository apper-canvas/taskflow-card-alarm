import { Routes, Route } from 'react-router-dom'
import TasksPage from './pages/TasksPage'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      <Routes>
        <Route path="/" element={<TasksPage />} />
        <Route path="/tasks/:id" element={<TasksPage />} />
      </Routes>
    </div>
  )
}

export default App