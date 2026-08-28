import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import './App.css'
import CustomerPage from './pages/CustomerPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/customers" element={<CustomerPage />} />
        <Route path="*" element={<Navigate to="/customers" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
