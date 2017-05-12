import React from 'react'
import { Route, Switch } from 'react-router'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'

import Home from '../../components/Home'
import PersonalInfo from '../../components/PersonalInfo'
import Courses from '../../components/FakeCourses'

import ContentfulPage from '../../components/Contentful/Page'
import ContentfulFloor from '../../components/Contentful/Floor'
import rootReducers from '../../reducers'
import thunkMiddleware from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(
    thunkMiddleware // lets us dispatch() functions
  ))
)

const App = () => {
  return (
    <Provider store={store}>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/personal' component={PersonalInfo} />
        <Route exact path='/courses' component={Courses} />
        <Route exact path='/floor/:id' component={ContentfulFloor} />
        <Route exact path='/:id' component={ContentfulPage} />
      </Switch>
    </Provider>
  )
}

export default App
