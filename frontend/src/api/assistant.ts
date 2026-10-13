import { API_URL } from './config'

export type AssistantRequest = {
  message: string
  contractNumber: string
}

export type AssistantResponse = {
  answer: string
  sources: {
    policyId: number
    title: string
    type: string
  }[]
}

export async function generateSuggestion(body: AssistantRequest): Promise<AssistantResponse> {
  const response = await fetch(`${API_URL}/assistant/message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new Error('Failed to generate suggestion')
  }

  return response.json()
}
