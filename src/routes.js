import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Home from './components/Home'
import Static from './components/Static'

const Routes = (props) => (
  <Router {...props}>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/:id' component={Static} />
    </Switch>
  </Router>
)

export default Routes
