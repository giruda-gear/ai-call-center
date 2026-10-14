import type { AssistantResponse } from '../../api/assistant'

type AiAssistPanelProps = {
  message: string
  selectedContractNumber?: string
  suggestion?: AssistantResponse
  isPending: boolean
  isError: boolean
  onMessageChange: (value: string) => void
  onGenerate: () => void
}

export default function AiAssistPanel({
  message,
  selectedContractNumber,
  suggestion,
  isPending,
  isError,
  onMessageChange,
  onGenerate,
}: AiAssistPanelProps) {
  return (
    <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
      <h2 className="font-semibold">AI Assist</h2>

      <textarea
        value={message}
        onChange={(e) => onMessageChange(e.target.value)}
        placeholder="Enter customer question"
        className="mt-4 w-full rounded border border-blue-300 p-3"
      />

      <button
        type="button"
        disabled={!selectedContractNumber || !message.trim() || isPending}
        onClick={onGenerate}
        className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
      >
        {isPending ? 'Generating...' : 'Generate suggestion'}
      </button>

      {isError && <p className="mt-4 text-sm text-red-600">Failed to generate suggestion</p>}

      {suggestion && (
        <div className="mt-6 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700">Suggested answer</h3>

            <p className="mt-2 whitespace-pre-wrap rounded-lg bg-gray-50 p-4 text-sm text-gray-800">
              {suggestion.answer}
            </p>
          </div>

          {suggestion.sources.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700">Sources</h3>

              <div className="mt-2 space-y-2">
                {suggestion.sources.map((source) => (
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
  )
}
