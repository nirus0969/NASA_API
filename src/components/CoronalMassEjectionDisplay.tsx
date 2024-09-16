import React, { useState } from 'react'
import { CmeActivity, cmeData } from '@/types.ts'
import { useCME } from '@/hooks/useNASAData.ts'
import DataFilter from './DataFilter'
import HomePage from './HomePage'

const CoronalMassEjectionDisplay: React.FC = () => {
  const { isLoading, error, data } = useCME() as {
    isLoading: boolean
    error: Error | null
    data: cmeData
  }

  const [isAscending, setIsAscending] = useState<boolean>(() =>
    sessionStorage.getItem('sortOrder') === 'descending' ? false : true
  )

  const [sourceLocationFilter, setSourceLocation] = useState<string | null>(
    () => sessionStorage.getItem('sourceLocationFilter') ?? null
  )

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return (
      <div>
        <p>Something went wrong: {error.message}</p>
        <HomePage />
      </div>
    )
  }

  const sortedAndFilteredData = (data as cmeData)
    .filter(
      (item) =>
        !sourceLocationFilter || item.sourceLocation.includes(sourceLocationFilter)
    )
    .sort((a: CmeActivity, b: CmeActivity) => {
      return isAscending
        ? new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
        : new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
    })

  const uniqueSourceLocations = Array.from(
    new Set(data.map((item) => item.sourceLocation))
  )

  const handleSortToggle = () => {
    const newSortOrder = isAscending ? false : true
    setIsAscending(newSortOrder)
    sessionStorage.setItem('sortOrder', newSortOrder ? 'ascending' : 'descending')
  }

  return (
    <div className="box">
      <HomePage />
      <h2>Coronal mass ejection</h2>
      <DataFilter
        uniqueValues={uniqueSourceLocations}
        filterKey="Location"
        onFilterChange={setSourceLocation}
        onToggleSort={handleSortToggle}
        currentSortOrder={isAscending ? 'ascending' : 'descending'}
      />

      {sortedAndFilteredData.map(
        (item: CmeActivity) =>
          item.note && (
            <div key={item.activityID} className="box">
              <h3>{item.activityID}</h3>
              <p>{item.note}</p>
              {item.cmeAnalyses && (
                <p>{item.cmeAnalyses[item.cmeAnalyses.length - 1]?.note}</p>
              )}
            </div>
          )
      )}
    </div>
  )
}

export default CoronalMassEjectionDisplay
