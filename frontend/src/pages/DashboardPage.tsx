import { useState } from 'react'
import CustomerSearch from '../components/customer/CustomerSearch'
import { useQuery } from '@tanstack/react-query'
import { searchCustomers } from '../api/customer'
import CustomerSummary from '../components/customer/CustomerSummary'

export default function DashboardPage() {
  const [query, setQuery] = useState('')

  const {
    data: customers,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['customers', query],
    queryFn: () => searchCustomers(query),
    enabled: query.trim().length > 0,
  })

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </header>

      <CustomerSearch onSearch={setQuery} />

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold">Customer</h2>
          {!customers && (
            <p className="mt-2 text-sm text-gray-500">No customer selected</p>
          )}
          {customers && <CustomerSummary customer={customers?.[0]} />}
        </section>

        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold">Contracts</h2>
          <p className="mt-2 text-sm text-gray-500">No contract selected</p>
        </section>

        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold">Recent Calls</h2>
          <p className="mt-2 text-sm text-gray-500">No customer selected</p>
        </section>
      </div>
    </div>
  )
}
