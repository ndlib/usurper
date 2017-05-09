// Import all reducers here
import contentfulPage from './contentful/page'
import contentfulFloor from './contentful/floor'
import personalReducer from './personal'
import searchReducer from './search'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  cfPageEntry: contentfulPage,
  cfFloorEntry: contentfulFloor,
  personal: personalReducer,
  searchType: searchReducer
})
export default rootReducer
