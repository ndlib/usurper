// Import all reducers here
import contentfulPage from './contentful/page'
import contentfulFloor from './contentful/floor'
import databaseLetter from './contentful/databaseLetter'
import servicePoints from './contentful/servicePoints'
import personalReducer from './personal'
import hoursReducer from './hours'
import searchReducer from './search'
import librarianInfo from './librarians'
import menuReducer from './menu'
import chatReducer from './chat'

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  cfPageEntry: contentfulPage,
  cfFloorEntry: contentfulFloor,
  cfDatabaseLetter: databaseLetter,
  cfServicePoints: servicePoints,
  personal: personalReducer,
  librarianInfo: librarianInfo,
  hours: hoursReducer,
  search: searchReducer,
  menus: menuReducer,
  chat: chatReducer,
})

export default rootReducer
