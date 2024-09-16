import { describe, vi } from 'vitest'
import flareData from '../mocks/flr.json'
import { CommonDataDisplay } from '@/components/CommonDataDisplay.tsx'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

describe('CommonDataDisplay', () => {
  it('should display the correct data', () => {
    vi.mock('@/hooks/useNASAData', () => ({
      useNASA: () => () => ({
        isLoading: false,
        error: null,
        data: flareData,
      }),
    }))

    render(
      <BrowserRouter>
        <CommonDataDisplay />
      </BrowserRouter>
    )

    expect(screen.getByText('Time: ' + flareData[0].time.toString())).toMatchSnapshot()
    expect(
      screen.getByText('Instruments: ' + flareData[0].instruments[0])
    ).toMatchSnapshot()
  })
})
