import React, { Component } from 'react'
import { Route, Switch } from 'react-router'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import Home from '../../components/Home'
import ContentfulPage from '../../components/Contentful/Page'
import rootReducers from '../../../reducers'
import thunkMiddleware from 'redux-thunk'

const store = createStore(
  rootReducers,
  applyMiddleware(
    thunkMiddleware // lets us dispatch() functions
  )
)

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/:id' component={ContentfulPage} />
        </Switch>
      </Provider>
    )
  }
}

export default App
