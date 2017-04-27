import React, { Component } from 'react'
import { Route, Switch } from 'react-router'
import Home from '../../components/Home'
import Static from '../../components/Static'
class App extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/:id' component={Static} />
      </Switch>
    )
  }
}

export default App
