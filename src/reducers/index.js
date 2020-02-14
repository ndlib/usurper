// Import all reducers here
import contentfulPage from './contentful/page'
import contentfulBranches from './contentful/branches'
import contentfulSubjects from './contentful/subjects'
import contentfulNews from './contentful/news'
import contentfulAllNews from './contentful/allNews'
import contentfulAllAlerts from './contentful/allAlerts'
import contentfulEvent from './contentful/event'
import contentfulAllEvents from './contentful/allEvents'
import contentfulExhibit from './contentful/exhibit'
import contentfulAllExhibits from './contentful/allExhibits'
import contentfulFloor from './contentful/floor'
import contentfulStatic from './contentful/staticContent'
import database from './contentful/database'
import servicePoints from './contentful/servicePoints'
import entryReducer from './contentful/entry'
import personalReducer from './personal'
import renewalReducer from './alephRenewal'
import settingsReducer from './settings'
import hoursReducer from './hours'
import searchReducer from './search'
import librarianInfo from './librarians'
import menuReducer, { hasNavigation } from './menu'
import chatReducer from './chat'
import advancedSearch from './advancedSearch'
import floorSearch from './floorSearch'
import favorites from './favorites'

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  cfPageEntry: contentfulPage,
  cfBranches: contentfulBranches,
  cfSubjects: contentfulSubjects,
  cfNewsEntry: contentfulNews,
  allNews: contentfulAllNews,
  allAlerts: contentfulAllAlerts,
  cfEventEntry: contentfulEvent,
  allEvents: contentfulAllEvents,
  cfExhibitEntry: contentfulExhibit,
  allExhibits: contentfulAllExhibits,
  cfFloorEntry: contentfulFloor,
  cfStatic: contentfulStatic,
  cfDatabases: database,
  cfServicePoints: servicePoints,
  cfEntry: entryReducer,
  personal: personalReducer,
  renewal: renewalReducer,
  settings: settingsReducer,
  librarianInfo: librarianInfo,
  hours: hoursReducer,
  search: searchReducer,
  menus: menuReducer,
  chat: chatReducer,
  advancedSearch: advancedSearch,
  floorSearch: floorSearch,
  favorites: favorites,
  renderComponents: hasNavigation,
})

export default rootReducer
