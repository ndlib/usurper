// Import all reducers here
import contentfulPage from './contentful/page'
import contentfulFloor from './contentful/floor'
import personalReducer from './personal'
import hoursReducer from './hours'
import searchReducer from './search'

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  cfPageEntry: contentfulPage,
  cfFloorEntry: contentfulFloor,
  personal: personalReducer,
  hours: hoursReducer,
  search: searchReducer
})

export default rootReducer
