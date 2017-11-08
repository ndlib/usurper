import React from 'react'
import { Route, Switch, withRouter } from 'react-router'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'

import PageWrapper from '../../components/PageWrapper'
import Home from '../../components/Home'
import PersonalInfo from '../../components/PersonalInfo'
import Courses from '../../components/Courses'
import Settings from '../../components/Settings'
import Hours from '../../components/Hours/Page'
import ChatPage from '../../components/ChatPage'
import ContentfulPage from '../../components/Contentful/Page'
import SecureContentfulPage from '../../components/Contentful/SecurePage'
import ContentfulFloor from '../../components/Contentful/Floor'
import ContentfulNews from '../../components/Contentful/News'
import DatabasePage from '../../components/Contentful/Database'
import ContentfulEvent from '../../components/Contentful/Event'
import News from '../../components/LandingPages/News'
import Events from '../../components/LandingPages/Events'
import Contact from '../LandingPages/Contact'
import DatabaseList from '../../components/DatabaseList'
import SubjectList from '../../components/SubjectList'
import rootReducers from '../../reducers'
import thunkMiddleware from 'redux-thunk'
import Rewrite from './Rewrite'

import NotFound from '../../components/Messages/NotFound'

import Config from '../../shared/Configuration'

import { LINK_CLICK } from '../Link'
import { SET_SEARCH, SAVE_SEARCH_PREFERENCE } from '../../actions/search.js'

const analyticsActions = [LINK_CLICK, SET_SEARCH, SAVE_SEARCH_PREFERENCE]

const analytics = () => next => action => {
  window.dataLayer = window.dataLayer || []
  if (analyticsActions.indexOf(action.type) > -1) {
    window.dataLayer.push({
      event: action.type,
      ...action,
    })
  }

  return next(action)
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    analytics
  ))
)

const App = (props) => {
  return (
    <Switch>
      { Rewrite(props) }
      <Provider store={store}>
        <div>
          <meta id='nd-version' content={Config.version} />
          <PageWrapper>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/chat' component={ChatPage} />
              <Route exact path='/courses' component={Courses} />
              <Route exact path='/settings' component={Settings} />
              <Route exact path='/hours' component={Hours} />
              <Route exact path='/events/(past)?' component={Events} />
              <Route exact path='/news' component={News} />
              <Route exact path='/contact-us' component={Contact} />
              <Route exact path='/floor/:id' component={ContentfulFloor} />
              <Route exact path='/news/:id' component={ContentfulNews} />
              <Route exact path='/event/:id' component={ContentfulEvent} />
              <Route exact path='/items-requests' component={PersonalInfo} />
              <Route exact path='/subjects' component={SubjectList} />
              <Route exact path='/database/:id' component={DatabasePage} />
              <Route exact path='/databases/:id' component={DatabaseList} />
              <Route exact path='/secure/:id' component={SecureContentfulPage} />
              <Route exact path='/:id' component={ContentfulPage} />

              <Route path='*' component={NotFound} />
            </Switch>
          </PageWrapper>
        </div>
      </Provider>
    </Switch>
  )
}

export default withRouter(App)
