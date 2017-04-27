import { createStore } from 'redux'
import rootReducer from './rootReducer'
export default(initialState) => {
	return createStore(rootReducer, initialState)
}
