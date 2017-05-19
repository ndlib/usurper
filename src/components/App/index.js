import React from 'react'
import { Route, Switch } from 'react-router'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'

import PageWrapper from '../../components/PageWrapper'
import Home from '../../components/Home'
import PersonalInfo from '../../components/PersonalInfo'
import Courses from '../../components/FakeCourses'
import Hours from '../../components/Hours/Page'

import ContentfulPage from '../../components/Contentful/Page'
import SecureContentfulPage from '../../components/Contentful/SecurePage'
import ContentfulFloor from '../../components/Contentful/Floor'
import rootReducers from '../../reducers'
import thunkMiddleware from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(
    thunkMiddleware // lets us dispatch() functions
  ))
)

const App = () => {
  return (
    <Provider store={store}>
      <PageWrapper>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/personal' component={PersonalInfo} />
          <Route exact path='/courses' component={Courses} />
          <Route exact path='/floor/:id' component={ContentfulFloor} />
          <Route exact path='/hours' component={Hours} />
          <Route exact path='/secure/:id' component={SecureContentfulPage} />
          <Route exact path='/:id' component={ContentfulPage} />
        </Switch>
      </PageWrapper>
    </Provider>
  )
}

export default App
