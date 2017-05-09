// Import all reducers here
import contentfulPage from './contentful/page'
import personalReducer from './personal'
import searchReducer from './search'
import librarianInfo from './librarians'

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  cfPageEntry: contentfulPage,
  personal: personalReducer,
  searchType: searchReducer,
  librarianInfo: librarianInfo,
})
export default rootReducer
