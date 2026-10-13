import { API_URL } from './config'

export type ContractType = 'HEALTH' | 'LIFE' | 'AUTO'

export type ContractStatus = 'ACTIVE' | 'EXPIRED'

export type Contract = {
  id: number
  customerId: number
  contractNumber: string
  type: ContractType
  status: ContractStatus
  startDate: string | null
  endDate: string | null
  createdAt: string
  updatedAt: string
}

export async function getContracts(customerNumber: string): Promise<Contract[]> {
  const response = await fetch(`${API_URL}/contracts/${encodeURIComponent(customerNumber)}`)

  if (!response.ok) {
    throw new Error('Failed to fetch contracts')
  }

  return response.json()
}
