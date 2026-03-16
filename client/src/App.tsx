import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Report from './pages/agent/Report'
import CsvReport from './pages/agent/CsvReport'
import MyReports from './pages/agent/MyReports'
import AgentDashboard from './pages/agent/AgentDashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsers from './pages/admin/AdminUsers'
import AdminReports from './pages/admin/AdminReports'
import ProtectedRoute from './components/ProtectedRoute'


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<ProtectedRoute allowedRoles={["agent"]} />}>
          <Route path="/agent/home" element={<AgentDashboard />} />
          <Route path="/agent/create/report" element={<Report />} />
          <Route path="/agent/create/csvReport" element={<CsvReport />} />
          <Route path="/agent/myReports" element={<MyReports />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/home" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/reports" element={<AdminReports />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
