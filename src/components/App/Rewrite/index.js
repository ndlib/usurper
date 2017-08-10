import React from 'react'
import RedirectRoutes from './redirectRoutes.js'
import { Route, Redirect } from 'react-router'

const Rewrite = (props) => {
  return RedirectRoutes.map((route, index) => {
    let path = ''
    if (route.forwardPath) {
      let found = props.location.pathname.match(route.forwardPath)
      if (found) {
        path = found[1]
      }
    }

    const forwardSearch = route.forwardQuery ? props.location.search : ''
    const target = route.target + path + forwardSearch

    // external redirect
    if (route.target.indexOf('http') === 0) {
      return (
        <Route
          key={index}
          exact path={route.path}
          render={
              () => {
                window.location = target
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
            <Redirect to={target} />
          )}
      />)
    // internal redirect
    } else {
      return (
        <Route
          key={index}
          exact path={route.path}
          render={() => (
            <Redirect to={target} />
          )}
      />)
    }
  })
}

export default Rewrite
