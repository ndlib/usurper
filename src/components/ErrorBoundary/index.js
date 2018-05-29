/***
  For more details see original pull request:

  https://github.com/ndlib/usurper/pull/467
***/
import React, { Component } from 'react'
import hoistNonReactStatic from 'hoist-non-react-statics'

/***

This is the simplest usage of ErrorBoundary. This is most likely not the
component you are looking for. Look at withErrorBoundary instead.

You may want to use this if you are trying to insert an ErrorBoundary within the
render method of complex PresenterFactory where you are not necessarily
returning a React component.

Example Usage:

    <ErrorBoundary>
      <PossiblyBrokenComponent/>
    </ErrorBoundary>

***/
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

  // If nothing is broken return unaltered component.
  render () {
    if (this.state.hasCatastrophicError) {
      return null
    }
    return this.props.children
  }
}

/***

This is the preferred usage. It allows you to simply wrap a component with an
error boundary without internal changes to the code. In complex components you
will likely import it in the index.js file and usage is similar to other
higher-order wrapping components such as withRouter().

Optionally, you also pass an alternative component to render in the event that
you do actually hit an ErrorBoundary.

Example Usage (basic):

    ...
    import {withErrorBoundary} from '<PATH>/ErrorBoundary'
    const MyComponent = (props) => {
    ...
    }
    export default withErrorBoundary(MyComponent)

Example Usage (with an alternate component to be render in case of an error):

    ...
    import {withErrorBoundary} from '<PATH>/ErrorBoundary'
    const MyComponent = (props) => {
    ...
    }
    const AltComponent = () => { return <div>Something went wrong.</div> }
    export default withErrorBoundary(MyComponent, AltComponent)

***/
function withErrorBoundary (WrappedComponent, AlternateComponent) {
  // If there isn't an alternate component render null.
  if (!AlternateComponent) {
    AlternateComponent = () => {
      return null
    }
  }

  // We need to make some changes to render for a higher order component to work
  // because we are passing around actual components instead of just props.
  class ErrorBoundaryWrapper extends ErrorBoundary {
    render () {
      if (this.state.hasCatastrophicError) {
        return <AlternateComponent />
      }
      return <WrappedComponent {...this.props} />
    }
  }

  /***
   We are passing the Component display name through unaltered.
   We are doing this to avoid creating unnecessary complexity when writing
   tests for new components that use `withErrorBoundary`.
  ***/
  ErrorBoundaryWrapper.displayName = `${Component.displayName || WrappedComponent.name}`

  // Pick up all the extra non-standard methods from the WrappedComponent
  hoistNonReactStatic(ErrorBoundaryWrapper, WrappedComponent)

  return ErrorBoundaryWrapper
}

export { withErrorBoundary }
export default ErrorBoundary
