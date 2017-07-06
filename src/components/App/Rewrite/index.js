import React from 'react'
import LibRedirect from './Redirect'
import RedirectRoutes from './redirectRoutes.js'
import { Switch } from 'react-router'

const Rewrite = () => {
  const redirects = RedirectRoutes.map((route, index) => {
    return (
      <LibRedirect
        path={route.path}
        target={route.target}
        external={route.external}
        key={index} />
    )
  })
  return (
    <Switch>
      {redirects}
    </Switch>
  )
}

export default Rewrite
