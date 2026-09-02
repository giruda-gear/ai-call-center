import { useState } from 'react'

type CustomerSearchProps = {
  onSearch: (query: string) => void
}

export default function CustomerSearch({ onSearch }: CustomerSearchProps) {
  const [value, setValue] = useState('')

  const handleSearch = () => {
    if (!value.trim()) return

    onSearch(value)
  }
  return (
    <div className="mx-auto flex max-w-2xl items-center rounded-2xl border bg-white px-4 py-2 shadow-sm">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch()
          }
        }}
        type="text"
        placeholder="search customer..."
        className="flex-1 bg-transparent outline-none"
      />
    </div>
  )
}
