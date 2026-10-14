import type { Contract } from '../../api/contracts'

type ContractListProps = {
  contracts: Contract[]
  selectedContractNumber?: string
  onSelect: (contractNumber: string) => void
}

export default function ContractList({
  contracts,
  selectedContractNumber,
  onSelect,
}: ContractListProps) {
  return (
    <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="font-semibold">Contracts</h2>
      {contracts?.length > 0 ? (
        contracts?.map((contract) => (
          <button
            key={contract.id}
            type="button"
            onClick={() => onSelect(contract.contractNumber)}
            className={`block w-full rounded-lg border p-3 text-left ${
              selectedContractNumber === contract.contractNumber
                ? 'border-blue-300 bg-blue-50'
                : 'border-gray-200 bg-white hover:bg-gray-50'
            }`}
          >
            <p>{contract.contractNumber}</p>
            <p>{contract.type}</p>
          </button>
        ))
      ) : (
        <p className="mt-2 text-sm text-gray-500">No contract selected</p>
      )}
    </section>
  )
}
