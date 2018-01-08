import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { browserHistory } from 'react-router'
import App from '../../components/App'
jest.mock("react-ga")
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter history={browserHistory}>
      <App />
    </BrowserRouter>,
  div)
})
