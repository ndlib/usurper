// Import all reducers here
import contentfulPage from './contentful/page'
import personalReducer from './personal'
import searchReducer from './search'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  cfPageEntry: contentfulPage,
  personal: personalReducer,
  search: searchReducer
})
export default rootReducer
