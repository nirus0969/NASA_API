import { Component, ErrorInfo, ReactNode } from 'react'
import HomePage from './HomePage'

interface State {
  hasError: boolean
  message: string
}

interface Props {
  children: ReactNode
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    message: '',
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <>
          <HomePage />
          <h3>Oops, something went wrong!</h3>
          <p>Error message: {this.state.message}</p>
          <button onClick={() => window.location.reload()}>Reload</button>
        </>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
