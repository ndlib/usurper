export const SET_ADVANCED_SEARCH_FIELD = 'SET_ADVANCED_SEARCH_FIELD'

export const setSearchOption = (fieldId, fieldValue) => {
  return {
    type: SET_ADVANCED_SEARCH_FIELD,
    fieldId: fieldId,
    fieldValue: fieldValue,
  }
}

export const actions = {
  setSearchOption,
}
