import { API_URL } from './config'

export type CallDirection = 'INBOUND' | 'OUTBOUND'

export type CallHistory = {
  id: number
  customerId: number | null
  direction: CallDirection
  fromNumber: string
  toNumber: string
  callNotes: string | null
  startedAt: string
  endedAt: string | null
  duration: number | null
}

export type UpdateCallHistoryRequest = {
  customerRequestSummary?: string
  actionTaken?: string
  disposition?: 'RESOLVED' | 'FOLLOW_UP' | 'ESCALATED'
  endedAt?: string
}

export async function getCallHistories(customerNumber: string): Promise<CallHistory[]> {
  const response = await fetch(
    `${API_URL}/call-histories?customerNumber=${encodeURIComponent(customerNumber)}`,
  )

  if (!response.ok) {
    throw new Error('Failed to fetch call histories')
  }

  return response.json()
}

export async function updateCallHistory(id: number, body: UpdateCallHistoryRequest) {
  const response = await fetch(`${API_URL}/call-histories/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new Error('Failed to update call history')
  }

  return response.json()
}
