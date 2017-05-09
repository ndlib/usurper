export const SET_SEARCH = 'SET_SEARCH'
export const OPEN_SEARCHBOX = 'OPEN_SEARCHBOX'
export const CLOSE_SEARCHBOX = 'CLOSE_SEARCHBOX'

export function setSearchType (searchType) {
  return {
    type: SET_SEARCH,
    searchType
  }
}
export function openSearchBox () {
  return {
    type: OPEN_SEARCHBOX
  }
}

export function closeSearchBox () {
  return {
    type: CLOSE_SEARCHBOX
  }
}

export const actions = {
  setSearchType
}
