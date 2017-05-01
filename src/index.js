import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import Routes from './routes'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducers from '../../../reducers'
import thunkMiddleware from 'redux-thunk'
import './index.css'

const store = createStore(
  rootReducers,
  applyMiddleware(
    thunkMiddleware // lets us dispatch() functions
  )
)

ReactDOM.render(
  <Provider store={store}>
    <Routes history={browserHistory} />
  </Provider>,
  document.getElementById('root')
)
