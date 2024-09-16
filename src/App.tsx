import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import CoronalMassEjectionDisplay from '@/components/CoronalMassEjectionDisplay.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import DailyPictureBackground from '@/components/DailyPictureBackground.tsx'
import HomePage from '@/components/HomePage.tsx'
import { CommonDataDisplay } from '@/components/CommonDataDisplay.tsx'
import ErrorBoundary from '@/components/ErrorBoundary.tsx'

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <DailyPictureBackground />
        <Link to={'/project1'}>
          <div className="header">
            <img src="./space.png" alt="space" width="100" height="100" />
            <h1>NASA APIs</h1>
          </div>
        </Link>
        <div className="mainContent">
          <ErrorBoundary>
            <Routes>
              <Route path="/project1" Component={HomePage} />
              <Route path="/project1/CME" Component={CoronalMassEjectionDisplay} />
              <Route path="/project1/:hookName" Component={CommonDataDisplay} />
            </Routes>
          </ErrorBoundary>
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App
