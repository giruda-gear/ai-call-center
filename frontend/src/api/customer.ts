export async function getCustomers() {
  const response = await fetch('http://localhost:3000/customers')

  if (!response.ok) throw Error('Failed to fetch customers')

  return response.json()
}
