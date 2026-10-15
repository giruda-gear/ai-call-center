import { useState } from 'react'

type Disposition = 'RESOLVED' | 'FOLLOW_UP' | 'ESCALATED'

type WrapUpData = {
  summary: string
  actionTaken: string
  disposition: Disposition
  nextStep: string
}

type CallWrapUpPanelProps = {
  selectedCallHistoryId?: number
  transcript: string
  isSummarizing: boolean
  isSaving: boolean
  isSaved: boolean
  onTranscriptChange: (value: string) => void
  onGenerateSummary: () => Promise<string | undefined>
  onSave: (data: WrapUpData) => void
}

export default function CallWrapUpPanel({
  selectedCallHistoryId,
  transcript,
  isSummarizing,
  isSaving,
  isSaved,
  onTranscriptChange,
  onGenerateSummary,
  onSave,
}: CallWrapUpPanelProps) {
  const [summary, setSummary] = useState('')
  const [actionTaken, setActionTaken] = useState('')
  const [disposition, setDisposition] = useState<Disposition>('RESOLVED')
  const [nextStep, setNextStep] = useState('')

  async function handleGenerateSummary() {
    const generatedSummary = await onGenerateSummary()

    if (generatedSummary) {
      setSummary(generatedSummary)
    }
  }

  function handleSubmit() {
    onSave({
      summary,
      actionTaken,
      disposition,
      nextStep,
    })
  }

  return (
    <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
      <h2 className="font-semibold">Call Wrap-up</h2>

      <textarea
        value={transcript}
        onChange={(e) => onTranscriptChange(e.target.value)}
        placeholder="Call transcript"
        className="mt-4 min-h-32 w-full rounded-lg border border-gray-200 p-3"
      />

      <button
        type="button"
        disabled={!transcript.trim() || isSummarizing}
        onClick={handleGenerateSummary}
        className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-blue-300"
      >
        {isSummarizing ? 'Summarizing...' : 'Generate summary'}
      </button>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
        className="space-y-4"
      >
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Customer request summary"
          className="mt-4 min-h-24 w-full rounded-lg border border-gray-200 p-3"
        />

        <textarea
          value={actionTaken}
          onChange={(e) => setActionTaken(e.target.value)}
          placeholder="Action taken"
          className="min-h-24 w-full rounded-lg border border-gray-200 p-3"
        />

        <select
          value={disposition}
          onChange={(e) => setDisposition(e.target.value as Disposition)}
          className="rounded-lg border border-gray-200 p-2"
        >
          <option value="RESOLVED">Resolved</option>
          <option value="FOLLOW_UP">Follow-up</option>
          <option value="ESCALATED">Escalated</option>
        </select>

        <input
          value={nextStep}
          onChange={(e) => setNextStep(e.target.value)}
          placeholder="Next step (optional)"
          className="w-full rounded-lg border border-gray-200 p-3"
        />

        <button
          type="submit"
          disabled={!selectedCallHistoryId || !summary.trim() || !actionTaken.trim() || isSaving}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-blue-300"
        >
          {isSaving ? 'Saving...' : 'Save wrap-up'}
        </button>

        {isSaved && <p className="text-sm text-green-600">Call wrap-up saved.</p>}
      </form>
    </section>
  )
}
