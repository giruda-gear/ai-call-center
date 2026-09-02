import type { Customer } from '../../api/customer'

type CustomerSummaryProps = {
  customer: Customer
}

export default function CustomerSummary({ customer }: CustomerSummaryProps) {
  return (
    <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold">{customer.name}</h2>

      <p className="text-sm text-gray-500">{customer.customerNumber}</p>

      <div className="mt-3 text-sm">
        <p>{customer.email}</p>
        <p>{customer.phone}</p>
      </div>
    </div>
  )
}
