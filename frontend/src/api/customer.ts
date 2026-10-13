import { API_URL } from './config'

export type Customer = {
  id: number
  customerNumber: string
  name: string
  email: string
  phone: string | null
}

export async function getCustomers(): Promise<Customer[]> {
  const response = await fetch(`${API_URL}/customers`)

  if (!response.ok) throw Error('Failed to fetch customers')

  return response.json()
}

export async function searchCustomers(query: string): Promise<Customer[]> {
  const response = await fetch(`http://localhost:3000/customers?q=${encodeURIComponent(query)}`)

  if (!response.ok) throw Error('Failed to fetch customers')

  return response.json()
}
