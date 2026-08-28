import { useQuery } from '@tanstack/react-query'
import { getCustomers } from '../api/customer'

export default function CustomerPage() {
  const {
    data: customers,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['customers'],
    queryFn: getCustomers,
  })

  if (isError) {
    return <p>failed to load customers.</p>
  }

  if (isPending) {
    return <p>loading customers...</p>
  }

  return (
    <div>
      <h1>Customers</h1>
      {customers.map((customer: any) => (
        <div key={customer.id}>
          {customer.name} - {customer.email}
        </div>
      ))}
    </div>
  )
}
