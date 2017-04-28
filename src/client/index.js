import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { browserHistory } from 'react-router'
import App from '../shared/components/App'

render((
  <BrowserRouter history={browserHistory}>
    <App />
  </BrowserRouter>),
  document.getElementById('root')
)
