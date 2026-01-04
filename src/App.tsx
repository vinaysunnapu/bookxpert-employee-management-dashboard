import { Routes, Route } from 'react-router-dom'
import Login from './auth/Login'
import Dashboard from './pages/Dashboard'
import AddEmployee from './pages/AddEmployee'
import EditEmployee from './pages/EditEmployee'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add-employee" element={<AddEmployee />} />
      <Route path="/edit-employee/:id" element={<EditEmployee />} />
    </Routes>
  )
}

export default App
