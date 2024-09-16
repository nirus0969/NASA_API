import { FC, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

interface DataFilterProps {
  uniqueValues: string[]
  filterKey: string
  onFilterChange: (value: string | null) => void
  onToggleSort?: () => void
  currentSortOrder?: 'asc' | 'desc' | 'ascending' | 'descending'
}

const DataFilter: FC<DataFilterProps> = ({
  uniqueValues,
  filterKey,
  onFilterChange,
  onToggleSort,
  currentSortOrder,
}) => {
  const { hookName } = useParams()

  const [selectedFilter, setSelectedFilter] = useState<string | null>(
    () => sessionStorage.getItem(filterKey + hookName) ?? null
  )

  useEffect(() => {
    onFilterChange(selectedFilter)
    sessionStorage.setItem(filterKey + hookName, selectedFilter ?? '')
  }, [selectedFilter, onFilterChange, filterKey])

  return (
    <div className="dataFilterWrapper">
      <button onClick={onToggleSort} className="dataFilterElement dataSortButton">
        Toggle Sort Order (Currently: {currentSortOrder})
      </button>

      <select
        className="dataFilterElement dataFilterSelect"
        value={selectedFilter ?? ''}
        onChange={(e) => {
          const value = e.target.value || null
          setSelectedFilter(value)
        }}
      >
        <option value="">Filter by {filterKey}</option>
        {uniqueValues.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  )
}

export default DataFilter
