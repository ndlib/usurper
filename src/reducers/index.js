// Import all reducers here
import contentfulPage from './contentful/page'
import contentfulNews from './contentful/news'
import contentfulAllNews from './contentful/allNews'
import contentfulEvent from './contentful/event'
import contentfulAllEvents from './contentful/allEvents'
import contentfulFloor from './contentful/floor'
import contentfulStatic from './contentful/staticContent'
import databaseLetter from './contentful/databaseLetter'
import servicePoints from './contentful/servicePoints'
import entryReducer from './contentful/entry'
import personalReducer from './personal'
import hoursReducer from './hours'
import searchReducer from './search'
import librarianInfo from './librarians'
import menuReducer from './menu'
import chatReducer from './chat'
import advancedSearch from './advancedSearch'

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  cfPageEntry: contentfulPage,
  cfNewsEntry: contentfulNews,
  allNews: contentfulAllNews,
  cfEventEntry: contentfulEvent,
  allEvents: contentfulAllEvents,
  cfFloorEntry: contentfulFloor,
  cfStatic: contentfulStatic,
  cfDatabaseLetter: databaseLetter,
  cfServicePoints: servicePoints,
  cfEntry: entryReducer,
  personal: personalReducer,
  librarianInfo: librarianInfo,
  hours: hoursReducer,
  search: searchReducer,
  menus: menuReducer,
  chat: chatReducer,
  advancedSearch: advancedSearch,
})

export default rootReducer
