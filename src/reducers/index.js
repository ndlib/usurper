// Import all reducers here
import contentfulPage from './contentful/page'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  cfPageEntry: contentfulPage
})
export default rootReducer
