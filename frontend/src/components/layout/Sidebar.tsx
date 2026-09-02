import { NavLink } from 'react-router'

export default function Sidebar() {
  return (
    <aside className="w-56 border-r border-gray-200 bg-white p-4">
      <h1 className="mb-8 text-xl font-semibold">AI Customer Service</h1>
      <nav className="flex flex-col gap-2">
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/customers">Customers</NavLink>
      </nav>
    </aside>
  )
}
