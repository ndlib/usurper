import {
  SET_ADVANCED_SEARCH_FIELD,
} from '../actions/advancedSearch'

export default (
  state = {},
  action
) => {
  switch (action.type) {
    case SET_ADVANCED_SEARCH_FIELD:
      return Object.assign({}, state, {
        [action.fieldId]: action.fieldValue,
      })
    default:
      return state
  }
}
