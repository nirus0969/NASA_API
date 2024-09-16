import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNASA } from '@/hooks/useNASAData.ts'
import { CommonEventData } from '@/types.ts'
import DataFilter from './DataFilter'
import { LinkKey, getLink } from '@/utils/links'
import HomePage from './HomePage'

export const CommonDataDisplay = () => {
  const { hookName } = useParams()
  const {
    isLoading,
    error,
    data: unsortedData,
  } = useNASA(hookName ?? '')() as {
    isLoading: boolean
    error: Error | null
    data: CommonEventData[]
  }

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  useEffect(() => {
    const savedSortOrder = sessionStorage.getItem('sortOrder')
    if (savedSortOrder === 'asc' || savedSortOrder === 'desc') {
      setSortOrder(savedSortOrder)
    }
  }, [])

  const [instrumentFilter, setInstrumentFilter] = useState<string | null>(
    () => sessionStorage.getItem('instrumentFilter') ?? null
  )

  const sortedAndFilteredData = unsortedData
    ?.filter((item) => !instrumentFilter || item.instruments.includes(instrumentFilter))
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return new Date(a.time ?? '').getTime() - new Date(b.time ?? '').getTime()
      } else {
        return new Date(b.time ?? '').getTime() - new Date(a.time ?? '').getTime()
      }
    })

  const uniqueInstruments = Array.from(
    new Set(unsortedData?.flatMap((item) => item.instruments) || [])
  )

  const handleSortToggle = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc'
    setSortOrder(newSortOrder)
    sessionStorage.setItem('sortOrder', newSortOrder)
  }

  return (
    <div className="box">
      <HomePage />
      <h2>{getLink(hookName as LinkKey)?.name ?? 'no name given'}</h2>

      <DataFilter
        uniqueValues={uniqueInstruments}
        filterKey={'instruments'}
        onFilterChange={setInstrumentFilter}
        onToggleSort={handleSortToggle}
        currentSortOrder={sortOrder}
      />

      {isLoading && <p>Loading...</p>}
      {error && <p>Something went wrong: {error.message}</p>}
      <div className="boxGrid">
        {sortedAndFilteredData?.map((item: CommonEventData) => (
          <div className="box" key={item.id}>
            <h6>Time: {item.time}</h6>
            <h3>Instruments: {item.instruments.join(', ')}</h3>
            <p>
              {item.linkedEvents.length > 0 &&
                'Linked Events: ' + item.linkedEvents[0].activityID}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
