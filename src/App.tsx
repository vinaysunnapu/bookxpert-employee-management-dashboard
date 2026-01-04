import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './auth/ProtectedRoute'
import Login from './auth/Login'
import Dashboard from './pages/Dashboard'
import AddEmployee from './pages/AddEmployee'
import EditEmployee from './pages/EditEmployee'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-employee"
        element={
          <ProtectedRoute>
            <AddEmployee />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-employee/:id"
        element={
          <ProtectedRoute>
            <EditEmployee />
          </ProtectedRoute>
        }
      />
      {/* 404 Not Found - Catch all undefined routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
