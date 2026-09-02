import { Outlet } from 'react-router'
import Sidebar from './Sidebar'

export default function DashboardLayout() {
  return (
    <div className="bg-50 flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  )
}
