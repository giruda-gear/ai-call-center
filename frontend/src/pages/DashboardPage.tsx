import { useState } from 'react'
import CustomerSearch from '../components/customer/CustomerSearch'
import { useQuery } from '@tanstack/react-query'
import { searchCustomers } from '../api/customer'
import CustomerSummary from '../components/customer/CustomerSummary'
import { getContracts } from '../api/contracts'
import { getCallHistories } from '../api/call-history'

export default function DashboardPage() {
  const [query, setQuery] = useState('')

  const {
    data: customers,
    isPending: isCustomersPending,
    isError: isCustomersError,
    refetch: refetchCustomers,
  } = useQuery({
    queryKey: ['customers', query],
    queryFn: () => searchCustomers(query),
    enabled: query.trim().length > 0,
  })

  const customerNumber = customers?.[0]?.customerNumber

  const {
    data: contracts,
    isPending: isContractsPending,
    isError: isContractsError,
  } = useQuery({
    queryKey: ['contracts', customers],
    queryFn: () => getContracts(customerNumber!),
    enabled: !!customerNumber,
  })

  const {
    data: callHistories,
    isPending: isCallHistoriesPending,
    isError: isCallHistoriesError,
  } = useQuery({
    queryKey: ['call-histories', customers],
    queryFn: () => getCallHistories(customerNumber!),
    enabled: !!customerNumber,
  })

  function handleSearch(value: string) {
    const trimmedValue = value.trim()

    if (trimmedValue === query) {
      refetchCustomers()
      return
    }

    setQuery(trimmedValue)
  }

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </header>

      <CustomerSearch onSearch={handleSearch} />

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold">Customer</h2>
          {customers && customers.length > 0 ? (
            <CustomerSummary customer={customers?.[0]} />
          ) : (
            <p className="mt-2 text-sm text-gray-500">No customer selected</p>
          )}
        </section>

        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold">Contracts</h2>
          {contracts && contracts?.length > 0 ? (
            contracts?.map((contract) => (
              <div key={contract.id}>
                <p>{contract.contractNumber}</p>
                <p>{contract.type}</p>
              </div>
            ))
          ) : (
            <p className="mt-2 text-sm text-gray-500">No contract selected</p>
          )}
        </section>

        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="font-semibold">Recent Calls</h2>
          {callHistories && callHistories?.length > 0 ? (
            callHistories?.map((callHistory) => (
              <div key={callHistory.id}>
                <p>{callHistory.fromNumber}</p>
                <p>{callHistory.callNotes}</p>
              </div>
            ))
          ) : (
            <p className="mt-2 text-sm text-gray-500">No call histories</p>
          )}
        </section>
      </div>
    </div>
  )
}
