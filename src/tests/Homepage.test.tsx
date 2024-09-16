import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import HomePage from '@/components/HomePage'
import { MemoryRouter } from 'react-router-dom'

test('should render Homepage component', () => {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  )

  const homePageElement = screen.getByTestId('homepage-1')
  expect(homePageElement).toBeInTheDocument()

  const pageTitle = screen.getByText('Choose an API to explore')
  expect(pageTitle).toBeInTheDocument()

  const cmeLink = screen.getByRole('link', { name: 'Coronal Mass Ejection' })
  expect(cmeLink).toHaveAttribute('href', '/project1/CME')

  const flrLink = screen.getByRole('link', { name: 'Solar Flare' })
  expect(flrLink).toHaveAttribute('href', '/project1/FLR')

  const rbeLink = screen.getByRole('link', { name: 'Radiation Belt Enhancement' })
  expect(rbeLink).toHaveAttribute('href', '/project1/RBE')

  const sepLink = screen.getByRole('link', { name: 'Solar Energetic Particle' })
  expect(sepLink).toHaveAttribute('href', '/project1/SEP')

  const mpcLink = screen.getByRole('link', { name: 'Magnetopause Crossing' })
  expect(mpcLink).toHaveAttribute('href', '/project1/MPC')
})
