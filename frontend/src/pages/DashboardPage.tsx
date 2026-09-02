import CustomerSearch from "../components/customer/CustomerSearch";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </header>

      <CustomerSearch />

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="rounded-lg border bg-white p-6">
          <h2 className="font-semibold">Customer Information</h2>
          <p className="mt-2 text-sm text-gray-500">No contract selected</p>
        </section>

        <section className="rounded-lg border bg-white p-6">
          <h2 className="font-semibold">Contracts</h2>
          <p className="mt-2 text-sm text-gray-500">No contract selected</p>
        </section>

        <section className="rounded-lg border bg-white p-6">
          <h2 className="font-semibold">Recent Calls</h2>
          <p className="mt-2 text-sm text-gray-500">No customer selected</p>
        </section>
      </div>
    </div>
  )
}
