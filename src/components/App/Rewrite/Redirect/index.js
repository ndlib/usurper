import React from 'react'
import { Route, Redirect, withRouter } from 'react-router'

const LibRedirect = (props) => {
  // external redirect
  if (props.target.indexOf('http') === 0) {
    return (
      <Route
        exact path={props.path}
        render={
            () => {
              window.location = props.target
              return null
            }
          }
      />
    )
  // index.php redirect
  } else if (props.path.indexOf('index.php') > 1) {
    const target = props.target + props.location.pathname.replace('index.php', '')
    console.log(target)
    return (
      <Route
        path={props.path}
        render={() => (
          <Redirect to={target} />
      )}
    />)
  // wildcard redirects
  } else if (props.path.indexOf('*') >= 0) {
    return (
      <Route
        path={props.path}
        render={() => (
          <Redirect to={props.target} />
        )}
    />)
  // internal redirect
  } else {
    return (
      <Route
        exact path={props.path}
        render={() => (
          <Redirect to={props.target} />
        )}
    />)
  }
}

export default withRouter(LibRedirect)
