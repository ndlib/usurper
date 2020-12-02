import React from 'react'
import { Route, Switch, withRouter } from 'react-router'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { withCookies } from 'react-cookie'
import typy from 'typy'

import Config from 'shared/Configuration'
import PageWrapper from 'components/Layout/PageWrapper'
import Home from 'components/Home'
import ItemsRequests from 'components/Account/ItemsRequests'
import Courses from 'components/Account/Courses'
import Hours from 'components/Hours/Page'
import ChatPage from 'components/ChatPage'
import ContentfulPage from 'components/Contentful/Page'
import ContentfulColumnPage from 'components/Contentful/ColumnPage'
import SecureContentfulPage from 'components/Contentful/SecurePage'
import ContentfulFloor from 'components/Contentful/Floor'
import ContentfulNews from 'components/Contentful/News'
import DatabasePage from 'components/Contentful/Database'
import SearchPage from 'components/SearchPage'
import ContentfulEvent from 'components/Contentful/Event'
import News from 'components/LandingPages/News'
// import StudySpaces from 'components/LandingPages/StudySpaces'
import CurrentEvents from 'components/LandingPages/Events/Current'
import PastEvents from 'components/LandingPages/Events/Past'
import EventGroup from 'components/LandingPages/Events/Group'
import CurrentExhibits from 'components/LandingPages/Exhibits/Current'
import PastExhibits from 'components/LandingPages/Exhibits/Past'
import DatabaseList from 'components/DatabaseList'
import SubjectList from 'components/SubjectList'
import FloorSearch from 'components/FloorSearch'
import rootReducers from 'reducers'
import thunkMiddleware from 'redux-thunk'
import CirculationHistory from 'components/Account/CirculationHistory'
import Preferences from 'components/Account/Preferences'
import Reservations from 'components/Account/Reservations'
import Floors from 'components/DynamicPages/FloorList'
import RoomReservations from 'components/DynamicPages/RoomReservations'
// import StudySpaces from 'components/LandingPages/StudySpaces'

import NotFound from 'components/Messages/NotFound'

import { LINK_CLICK } from 'components/Interactive/Link'
import { SET_SEARCH, SAVE_SEARCH_PREFERENCE } from 'actions/search.js'

const analyticsActions = [LINK_CLICK, SET_SEARCH, SAVE_SEARCH_PREFERENCE]

const analytics = () => next => action => {
  window.dataLayer = window.dataLayer || []
  if (analyticsActions.indexOf(typy(action, 'type').safeString) > -1) {
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
      <Provider store={store}>
        <PageWrapper {...props}>
          <Switch>
            <Route exact path='/' render={() => (<Home {...props} />)} /> {/* Render is needed to pass cookies */}
            <Route exact path='/chat' component={ChatPage} />
            <Route exact path='/courses' component={Courses} />
            <Route exact path='/hours' component={Hours} />
            <Route exact path='/events' component={CurrentEvents} />
            <Route exact path='/events/series/:groupId' component={EventGroup} />
            <Route exact path='/events/past' component={PastEvents} />
            <Route exact path='/events/past/:date' component={PastEvents} />
            <Route exact path='/events/:date' component={CurrentEvents} />
            { Config.features.exhibitsEnabled && (
              <Route exact path='/exhibits' component={CurrentExhibits} />
            )}
            { Config.features.exhibitsEnabled && (
              <Route exact path='/exhibits/past' component={PastExhibits} />
            )}
            { Config.features.exhibitsEnabled && (
              <Route exact path='/exhibits/past/:date' component={PastExhibits} />
            )}
            { Config.features.exhibitsEnabled && (
              <Route exact path='/exhibits/:date' component={CurrentExhibits} />
            )}
            <Route exact path='/news' component={News} />
            <Route exact path='/floor/search' component={FloorSearch} />
            <Route exact path='/floor/:id' component={ContentfulFloor} />
            <Route exact path='/hesburgh-floor-maps' render={() => (<Floors {...props} title='Hesburgh Library Floor Maps' slug='hesburgh-library-building' />)} />
            <Route exact path='/news/:id' component={ContentfulNews} />
            <Route exact path='/event/:id' component={ContentfulEvent} />
            <Route exact path='/items-requests' component={ItemsRequests} />
            <Route exact path='/checkout-history' component={CirculationHistory} />
            <Route exact path='/preferences' render={() => (<Preferences {...props} />)} />
            <Route exact path='/reservations/:dateRange?' component={Reservations} />
            <Route exact path='/subjects' component={SubjectList} />
            <Route exact path='/database/:id' component={DatabasePage} />
            <Route exact path='/databases' component={DatabaseList} />
            <Route exact path='/room-reservations' component={RoomReservations} />
            { /* <Route exact path='/study-spaces' component={StudySpaces} /> */ }
            <Route exact path='/secure/:id' component={SecureContentfulPage} />
            <Route exact path='/(services|research|libraries|about)' component={ContentfulColumnPage} />
            <Route exact path='/search' component={SearchPage} />
            <Route exact path='/:id' component={ContentfulPage} />

            <Route path='*' component={NotFound} />
          </Switch>
        </PageWrapper>
      </Provider>
    </Switch>
  )
}

export default withCookies(withRouter(App))
