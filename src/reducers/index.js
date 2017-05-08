// Import all reducers here
import contentfulPage from './contentful/page'
import personalReducer from './personal'
import hoursReducer from './hours'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  cfPageEntry: contentfulPage,
  personal: personalReducer,
  hours: hoursReducer
});

export default rootReducer
