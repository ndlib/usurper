import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import * as Sentry from '@sentry/browser'
import App from './components/App'
import Config from 'shared/Configuration'

Sentry.init({
  dsn: 'https://1df50f8918594d20b7cf9c6464238e0d@sentry.io/1281163',
  environment: Config.environment,
  release: `usurper@${Config.version}`,
  ignoreUrls: [/localhost/],
})

render((
  <BrowserRouter>
    <App />
  </BrowserRouter>),
document.getElementById('root')
)
