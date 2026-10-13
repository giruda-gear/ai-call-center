import { useState } from 'react'
import CustomerSearch from '../components/customer/CustomerSearch'
import { useMutation, useQuery } from '@tanstack/react-query'
import { searchCustomers } from '../api/customer'
import CustomerSummary from '../components/customer/CustomerSummary'
import { getContracts } from '../api/contracts'
import { getCallHistories } from '../api/call-history'
import { API_URL } from '../api/config'
import { generateSuggestion } from '../api/assistant'

export default function DashboardPage() {
  const [query, setQuery] = useState('')
  const [selectedContractNumber, setSelectedContractNumber] = useState<string>()
  const [message, setMessage] = useState('')
  console.log(API_URL)
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
    queryKey: ['contracts', customerNumber],
    queryFn: () => getContracts(customerNumber!),
    enabled: !!customerNumber,
  })

  const {
    data: callHistories,
    isPending: isCallHistoriesPending,
    isError: isCallHistoriesError,
  } = useQuery({
    queryKey: ['call-histories', customerNumber],
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

  const suggestionMutation = useMutation({
    mutationFn: generateSuggestion,
  })

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
              <button
                key={contract.id}
                type="button"
                onClick={() => setSelectedContractNumber(contract.contractNumber)}
                className={`block w-full rounded-lg border p-3 text-left ${
                  selectedContractNumber === contract.contractNumber
                    ? 'border-blue-300 bg-blue-50'
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                <p>{contract.contractNumber}</p>
                <p>{contract.type}</p>
              </button>
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
        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="font-semibold">AI Assist</h2>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter customer question"
            className="mt-4 w-full rounded border border-blue-300 p-3"
          />
          <button
            type="button"
            disabled={!selectedContractNumber || !message.trim() || suggestionMutation.isPending}
            onClick={() =>
              suggestionMutation.mutate({
                message,
                contractNumber: selectedContractNumber!,
              })
            }
            className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {suggestionMutation.isPending ? 'Generating...' : 'Generate suggestion'}
          </button>

          {suggestionMutation.isError && (
            <p className="mt-4 text-sm text-red-600">Failed to generate suggestion</p>
          )}

          {suggestionMutation.data && (
            <div className="mt-6 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700">Suggested answer</h3>

                <p className="mt-2 whitespace-pre-wrap rounded-lg bg-gray-50 p-4 text-sm text-gray-800">
                  {suggestionMutation.data.answer}
                </p>
              </div>

              {suggestionMutation.data.sources.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Sources</h3>

                  <div className="mt-2 space-y-2">
                    {suggestionMutation.data.sources.map((source) => (
                      <div key={source.policyId} className="rounded-lg border border-gray-200 p-3">
                        <p className="text-sm font-medium">{source.title}</p>
                        <p className="mt-1 text-xs text-gray-500">{source.type}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
