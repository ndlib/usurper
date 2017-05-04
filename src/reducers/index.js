// Import all reducers here
import contentfulPage from './contentful/page'
import personalReducer from './personal'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  cfPageEntry: contentfulPage,
  personal: personalReducer
})
export default rootReducer
