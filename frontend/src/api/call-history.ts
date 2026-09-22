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

export async function getCallHistories(
  customerNumber: string,
): Promise<CallHistory[]> {
  const response = await fetch(
    `http://localhost:3000/call-histories?customerNumber=${encodeURIComponent(customerNumber)}`,
  )

  if (!response.ok) {
    throw new Error('Failed to fetch call histories')
  }

  return response.json()
}
