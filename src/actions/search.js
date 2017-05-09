export const SET_SEARCH = 'SET_SEARCH'

export function setSearchType (searchType) {
  return {
    type: SET_SEARCH,
    searchType: searchType
  }
}
