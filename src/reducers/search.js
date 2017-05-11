import { SET_SEARCH } from '../actions/search.js'

export default (searchType = 0, action) => {
  //console.log(searchType, action.type)
  switch (action.type) {
    case SET_SEARCH:
    default:
      //console.log('reducer - searchType: ', searchType)
      return searchType
  }
}
