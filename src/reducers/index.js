// Import all reducers here
import contentfulPage from './contentful/page'
import personalReducer from './personal'
import hoursReducer from './hours'
import searchReducer from './search'

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  cfPageEntry: contentfulPage,
  personal: personalReducer,
  hours: hoursReducer,
  searchType: searchReducer
});

export default rootReducer
