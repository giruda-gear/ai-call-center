import { useState } from 'react'
import CustomerSearch from '../components/customer/CustomerSearch'
import { useMutation, useQuery } from '@tanstack/react-query'
import { searchCustomers } from '../api/customer'
import { getContracts } from '../api/contracts'
import {
  getCallHistories,
  updateCallHistory,
  type UpdateCallHistoryRequest,
} from '../api/call-history'
import { generateSuggestion, summarizeCall } from '../api/assistant'
import CallHistoryList from '../components/call-history/CallHistoryList'
import CustomerSection from '../components/customer/CustomerSection'
import ContractList from '../components/contract/ContractList'
import AiAssistPanel from '../components/assistant/AiAssistPanel'
import CallWrapUpPanel from '../components/assistant/CallWrapUpPanel'

export default function DashboardPage() {
  const [query, setQuery] = useState('')
  const [selectedContractNumber, setSelectedContractNumber] = useState<string>()
  const [selectedCallHistoryId, setSelectedCallHistoryId] = useState<number>()
  const [message, setMessage] = useState('')
  const [transcript, setTranscript] = useState('')

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
    refetch: refetchCallHistories,
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

  const summarizeMutation = useMutation({
    mutationFn: summarizeCall,
  })

  const updateCallHistoryMutation = useMutation({
    mutationFn: ({ id, body }: { id: number; body: UpdateCallHistoryRequest }) =>
      updateCallHistory(id, body),

    onSuccess: () => {
      refetchCallHistories()
      setSelectedCallHistoryId(undefined)
      setTranscript('')
    },
  })

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </header>

      <CustomerSearch onSearch={handleSearch} />

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CustomerSection customers={customers ?? []} />

        <ContractList
          contracts={contracts ?? []}
          selectedContractNumber={selectedContractNumber}
          onSelect={setSelectedContractNumber}
        />

        <CallHistoryList
          callHistories={callHistories ?? []}
          selectedCallHistoryId={selectedCallHistoryId}
          onSelect={setSelectedCallHistoryId}
        />

        <AiAssistPanel
          message={message}
          selectedContractNumber={selectedContractNumber}
          suggestion={suggestionMutation.data}
          isPending={suggestionMutation.isPending}
          isError={suggestionMutation.isError}
          onMessageChange={setMessage}
          onGenerate={() =>
            suggestionMutation.mutate({
              message,
              contractNumber: selectedContractNumber!,
            })
          }
        />

        <CallWrapUpPanel
          key={selectedCallHistoryId ?? 'none'}
          selectedCallHistoryId={selectedCallHistoryId}
          transcript={transcript}
          isSummarizing={summarizeMutation.isPending}
          isSaving={updateCallHistoryMutation.isPending}
          isSaved={updateCallHistoryMutation.isSuccess}
          onTranscriptChange={setTranscript}
          onGenerateSummary={async () => {
            const data = await summarizeMutation.mutateAsync({
              transcript,
            })

            return data.summary
          }}
          onSave={(data) => {
            if (!selectedCallHistoryId) {
              return
            }

            updateCallHistoryMutation.mutate({
              id: selectedCallHistoryId,
              body: {
                customerRequestSummary: data.summary,
                actionTaken: data.actionTaken,
                disposition: data.disposition,
                endedAt: new Date().toISOString(),
              },
            })
          }}
        />
      </div>
    </div>
  )
}
