import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import nock from 'nock'

import App from 'components/App'
import Config from 'shared/Configuration'

it('renders without crashing', () => {
  // Mock a successful response when calling Contentful for global alerts, since this is part of the page wrapper.
  nock(Config.contentfulAPI)
    .get(() => true)
    .query(true)
    .reply(200, [])
    .persist()

  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  div)
  ReactDOM.unmountComponentAtNode(div)
})
