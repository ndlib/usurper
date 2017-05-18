export const SET_SEARCH = 'SET_SEARCH'
export const OPEN_SEARCHBOX = 'OPEN_SEARCHBOX'
export const CLOSE_SEARCHBOX = 'CLOSE_SEARCHBOX'
export const SAVE_SEARCH_PREFERENCE = 'SAVE_SEARCH_PREFERENCE'
export const CLEAR_SEARCH_PREFERENCE = 'CLEAR_SEARCH_PREFERENCE'
export const OPEN_SEARCHDRAWER = 'OPEN_SEARCHDRAWER'
export const CLOSE_SEARCHDRAWER = 'CLOSE_SEARCHDRAWER'

export const setSearchType = (searchType) => {
  return {
    type: SET_SEARCH,
    searchType,
  }
}
export const openSearchBox = () => {
  return {
    type: OPEN_SEARCHBOX,
  }
}

export const closeSearchBox = () => {
  return {
    type: CLOSE_SEARCHBOX,
  }
}

export const saveSearchPreference = (pref) => {
  return {
    type: SAVE_SEARCH_PREFERENCE,
    hasPref: true,
    pref,
  }
}

export const clearSearchPreference = () => {
  return {
    type: CLEAR_SEARCH_PREFERENCE,
    hasPref: false,
    pref: null,
  }
}

export const openSearchDrawer = () => {
  return {
    type: OPEN_SEARCHDRAWER,
  }
}

export const closeSearchDrawer = () => {
  return {
    type: CLOSE_SEARCHDRAWER,
  }
}

export const actions = {
  setSearchType,
  openSearchBox,
  closeSearchBox,
  saveSearchPreference,
  clearSearchPreference,
  openSearchDrawer,
  closeSearchDrawer,
}
