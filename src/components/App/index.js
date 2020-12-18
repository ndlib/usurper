import React, { lazy, Suspense } from 'react'
import { Route, Switch, withRouter } from 'react-router'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { withCookies } from 'react-cookie'
import typy from 'typy'
import rootReducers from 'reducers'
import thunkMiddleware from 'redux-thunk'

import { SET_SEARCH, SAVE_SEARCH_PREFERENCE } from 'actions/search'

import Config from 'shared/Configuration'
import PageWrapper from 'components/Layout/PageWrapper'
import Loading from 'components/Messages/Loading'
import NotFound from 'components/Messages/NotFound'
import { LINK_CLICK } from 'components/Interactive/Link'

import Home from 'components/Home'
const ItemsRequests = lazy(() => import('components/Account/ItemsRequests'))
const Courses = lazy(() => import('components/Account/Courses'))
const Hours = lazy(() => import('components/Hours/Page'))
const ChatPage = lazy(() => import('components/ChatPage'))
const ContentfulPage = lazy(() => import('components/Contentful/Page'))
const ContentfulColumnPage = lazy(() => import('components/Contentful/ColumnPage'))
const SecureContentfulPage = lazy(() => import('components/Contentful/SecurePage'))
const ContentfulFloor = lazy(() => import('components/Contentful/Floor'))
const ContentfulNews = lazy(() => import('components/Contentful/News'))
const DatabasePage = lazy(() => import('components/Contentful/Database'))
const SearchPage = lazy(() => import('components/SearchPage'))
const ContentfulEvent = lazy(() => import('components/Contentful/Event'))
const News = lazy(() => import('components/LandingPages/News'))
// const StudySpaces = lazy(() => import('components/LandingPages/StudySpaces'))
const CurrentEvents = lazy(() => import('components/LandingPages/Events/Current'))
const PastEvents = lazy(() => import('components/LandingPages/Events/Past'))
const CurrentExhibits = lazy(() => import('components/LandingPages/Exhibits/Current'))
const PastExhibits = lazy(() => import('components/LandingPages/Exhibits/Past'))
const DatabaseList = lazy(() => import('components/DatabaseList'))
const SubjectList = lazy(() => import('components/SubjectList'))
const FloorSearch = lazy(() => import('components/FloorSearch'))
const CirculationHistory = lazy(() => import('components/Account/CirculationHistory'))
const Preferences = lazy(() => import('components/Account/Preferences'))
const Reservations = lazy(() => import('components/Account/Reservations'))
const Floors = lazy(() => import('components/DynamicPages/FloorList'))
const RoomReservations = lazy(() => import('components/DynamicPages/RoomReservations'))

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
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route exact path='/' render={() => (<Home {...props} />)} /> {/* Render is needed to pass cookies */}
              <Route exact path='/chat' component={ChatPage} />
              <Route exact path='/courses' component={Courses} />
              <Route exact path='/hours' component={Hours} />
              <Route exact path='/events' component={CurrentEvents} />
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
          </Suspense>
        </PageWrapper>
      </Provider>
    </Switch>
  )
}

export default withCookies(withRouter(App))
