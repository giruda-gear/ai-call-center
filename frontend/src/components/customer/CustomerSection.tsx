import type { Customer } from '../../api/customer'
import CustomerSummary from './CustomerSummary'

export default function CustomerSection({ customers }: { customers: Customer[] }) {
  return (
    <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="font-semibold">Customer</h2>
      {customers && customers.length > 0 ? (
        <CustomerSummary customer={customers?.[0]} />
      ) : (
        <p className="mt-2 text-sm text-gray-500">No customer selected</p>
      )}
    </section>
  )
}
