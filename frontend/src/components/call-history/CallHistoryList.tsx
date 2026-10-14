import type { CallHistory } from '../../api/call-history'

type CallHistoryListProps = {
  callHistories: CallHistory[]
  selectedCallHistoryId?: number
  onSelect: (id: number) => void
}

export default function CallHistoryList({
  callHistories,
  selectedCallHistoryId,
  onSelect,
}: CallHistoryListProps) {
  return (
    <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="font-semibold">Recent Calls</h2>
      {callHistories && callHistories.length > 0 ? (
        callHistories.map((callHistory) => (
          <button
            key={callHistory.id}
            type="button"
            onClick={() => onSelect(callHistory.id)}
            className={`block w-full rounded-lg border p-3 text-left transition ${
              selectedCallHistoryId === callHistory.id
                ? 'border-blue-300 bg-blue-50'
                : 'border-gray-200 bg-white hover:bg-gray-50'
            }`}
          >
            <p>{callHistory.fromNumber}</p>
            <p className="text-sm text-gray-500">{callHistory.callNotes || 'No notes'}</p>
          </button>
        ))
      ) : (
        <p className="mt-2 text-sm text-gray-500">No call histories</p>
      )}
    </section>
  )
}
