import React from 'react'
import RedirectRoutes from './redirectRoutes.js'
import { Route, Redirect } from 'react-router'
import { Helmet } from 'react-helmet'

const Rewrite = (props) => {
  return RedirectRoutes.map((route, index) => {
    let path = ''
    if (route.forwardPath) {
      const found = props.location.pathname.match(route.forwardPath)
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
              return (
                <Helmet>
                  <meta name='prerender-header' content={'Location: ' + target} />
                  <meta name='prerender-status-code' content='301' />
                </Helmet>
              )
            }
          }
        />
      )
    // index.php redirect
    } else if (route.path.indexOf('index.php') > 1) {
      // Remove slashes at the beginning of the location string and strip off /index.php at the end
      // This fixes an issue where duplicated slashes would result in a path that wasn't relative to the application
      const target = route.target + '/' + props.location.pathname.replace(/^[/\\]+|\/index\.php/g, '')
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
