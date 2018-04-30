import React, { Component } from 'react'
import hoistNonReactStatic from 'hoist-non-react-statics'

class ErrorBoundary extends Component {
  constructor (props) {
    super(props)
    this.state = { hasCatastrophicError: false }
  }

  componentDidCatch (error, info) {
    this.setState({ hasCatastrophicError: true })
    /***
      This is where a call to error logging service should go.
    ***/
    console.log('Hit an error boundary: ', error, info)
  }

  render () {
    if (this.state.hasCatastrophicError) {
      return null
    }
    return this.props.children
  }
}

function withErrorBoundary (WrappedComponent, AlternateComponent) {
  // If there isn't an alternate component render null.
  if (!AlternateComponent) {
    AlternateComponent = () => {
      return null
    }
  }

  // We need to make some changes to render for a higher order component to work
  class ErrorBoundaryWrapper extends ErrorBoundary {
    render () {
      if (this.state.hasCatastrophicError) {
        return <AlternateComponent />
      }
      return <WrappedComponent {...this.props} />
    }
  }

  // We are passing the Component display name through unaltered
  ErrorBoundaryWrapper.displayName = `${Component.displayName || WrappedComponent.name}`

  // Pick up all the extra non-standard methods from the WrappedComponent
  hoistNonReactStatic(ErrorBoundaryWrapper, WrappedComponent)
  return ErrorBoundaryWrapper
}

export { withErrorBoundary }
export default ErrorBoundary
