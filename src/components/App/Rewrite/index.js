import React from 'react'
import RedirectRoutes from './redirectRoutes.js'
import { Route, Redirect } from 'react-router'

const Rewrite = (props) => {
  return RedirectRoutes.map((route, index) => {
    const forwardPath = route.forwardPath ? props.location.pathname : ''
    // external redirect
    if (route.target.indexOf('http') === 0) {
      return (
        <Route
          key={index}
          exact path={route.path}
          render={
              () => {
                window.location = route.target + forwardPath
                return null
              }
            }
        />
      )
    // index.php redirect
    } else if (route.path.indexOf('index.php') > 1) {
      const target = route.target + props.location.pathname.replace('index.php', '')
      return (
        <Route
          key={index}
          path={route.path}
          render={() => (
            <Redirect to={target} />
        )}
      />)
    // wildcard redirects
    } else if (route.path.indexOf('*') >= 0) {
      return (
        <Route
          key={index}
          path={route.path}
          render={() => (
            <Redirect to={route.target + forwardPath} />
          )}
      />)
    // internal redirect
    } else {
      return (
        <Route
          key={index}
          exact path={route.path}
          render={() => (
            <Redirect to={route.target + forwardPath} />
          )}
      />)
    }
  })
}

export default Rewrite
