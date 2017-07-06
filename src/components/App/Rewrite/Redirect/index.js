import React from 'react'
import { Route, Redirect } from 'react-router'

const LibRedirect = (props) => {
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

export default LibRedirect
