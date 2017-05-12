import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { browserHistory } from 'react-router'
import localStorage from 'mock-local-storage'
import App from '../../components/App'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter history={browserHistory}>
      <App />
    </BrowserRouter>,
  div)
})
