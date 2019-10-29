import {
  CF_REQUEST_DATABASE_LETTER,
  CF_RECEIVE_DATABASE_LETTER,
  CF_REQUEST_DATABASE_DEFAULT_FAVORITES,
  CF_RECEIVE_DATABASE_DEFAULT_FAVORITES,
} from 'actions/contentful/database'
import { multidisciplinarySubject } from 'constants/staticData'
import * as statuses from 'constants/APIStatuses'
import typy from 'typy'

const initialState = {
  defaultFavorites: { status: statuses.NOT_FETCHED },
}
'abcdefghijklmnopqrstuvwxyz#'.split('').forEach((char) => {
  initialState[char] = { status: statuses.NOT_FETCHED }
})

export default (state = initialState, action) => {
  const letterData = {}

  switch (action.type) {
    case CF_REQUEST_DATABASE_LETTER:
      letterData[action.letter] = {
        status: statuses.FETCHING,
      }
      return Object.assign({}, state, letterData)
    case CF_RECEIVE_DATABASE_LETTER:
      letterData[action.letter] = {
        status: action.status,
        data: Array.isArray(action.data)
          ? action.data.map(item => {
            if (typy(item, 'fields.multidisciplinary').safeBoolean) {
              item.fields.subjects = typy(item, 'fields.subjects').safeArray
              if (!item.fields.subjects.some(sub => sub.sys.id === multidisciplinarySubject.sys.id)) {
                item.fields.subjects.push(multidisciplinarySubject)
              }
            }
            return item
          })
          : null,
      }
      return Object.assign({}, state, letterData)
    case CF_REQUEST_DATABASE_DEFAULT_FAVORITES:
      return Object.assign({}, state, {
        defaultFavorites: {
          status: statuses.FETCHING,
        },
      })
    case CF_RECEIVE_DATABASE_DEFAULT_FAVORITES:
      return Object.assign({}, state, {
        defaultFavorites: {
          status: action.status,
          data: action.data,
        },
      })
    default:
      return state
  }
}
