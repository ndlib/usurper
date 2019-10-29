import fetch from 'isomorphic-fetch'
import typy from 'typy'
import * as statuses from 'constants/APIStatuses'
import * as helper from 'constants/HelperFunctions'

export const CF_REQUEST_DATABASE_LETTER = 'CF_REQUEST_DATABASE_LETTER'
export const CF_RECEIVE_DATABASE_LETTER = 'CF_RECEIVE_DATABASE_LETTER'
export const CF_REQUEST_DATABASE_DEFAULT_FAVORITES = 'CF_REQUEST_DATABASE_DEFAULT_FAVORITES'
export const CF_RECEIVE_DATABASE_DEFAULT_FAVORITES = 'CF_RECEIVE_DATABASE_DEFAULT_FAVORITES'

export const requestLetter = (letter) => {
  return {
    type: CF_REQUEST_DATABASE_LETTER,
    letter,
  }
}

const receiveLetter = (letter, response) => {
  const error = {
    type: CF_RECEIVE_DATABASE_LETTER,
    // We won't get a 404, but we will get a 200 and an empty list
    status: response.status === 200 ? statuses.NOT_FOUND : statuses.ERROR,
    letter: letter,
    receivedAt: Date.now(),
  }

  const success = (data) => {
    return {
      type: CF_RECEIVE_DATABASE_LETTER,
      status: statuses.SUCCESS,
      letter: letter,
      data: data,
      receivedAt: Date.now(),
    }
  }

  if (Array.isArray(response)) {
    return success(response)
  } else {
    return error
  }
}

export const requestDatabaseDefaults = () => {
  return {
    type: CF_REQUEST_DATABASE_DEFAULT_FAVORITES,
  }
}

const receiveDatabaseDefaults = (response) => {
  const error = (response) => {
    return {
      type: CF_RECEIVE_DATABASE_DEFAULT_FAVORITES,
      status: response ? statuses.fromHttpStatusCode(response.status) : statuses.ERROR,
    }
  }

  const success = (data) => {
    return {
      type: CF_RECEIVE_DATABASE_DEFAULT_FAVORITES,
      status: statuses.SUCCESS,
      data: data,
    }
  }

  if (Array.isArray(response)) {
    return success(response)
  } else {
    return error(response)
  }
}

export const fetchLetter = (letter, preview) => {
  const url = helper.getContentfulQueryUrl(`content_type=resource&fields.databaseLetter=${letter}&include=1`, preview)

  return (dispatch, getState) => {
    dispatch(requestLetter(letter))
    return fetch(url)
      .then(response => {
        return (response.ok && response.headers.get('content-type')) ? response.json() : { status: response.status }
      })
      .then(json => {
        const allSubjects = typy(getState(), 'cfSubjects.data').safeArray
        if (Array.isArray(json)) {
          json.forEach((row) => {
            // If best bets exist, add them to subjects
            typy(row, 'fields.bestBets').safeArray.forEach(bestBet => {
              row.fields.subjects = typy(row, 'fields.subjects').safeArray
              // Make sure best bet does not already exist in subject list to prevent duplicates
              if (!row.fields.subjects.find(subject => subject.sys.id === bestBet.sys.id)) {
                row.fields.subjects.push(bestBet)
              }
            })
            // Merge internal link info into subject so we can get the correct title in the UI
            row.fields.subjects = typy(row.fields.subjects).safeArray.map(dbSubject => {
              return helper.mergeInternalLink(dbSubject, allSubjects)
            })
            row['searchBlob'] = (row.fields.title
              ? row.fields.title.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`'~()]/g, '')
              : '')
            if (row.fields.alternateTitles) {
              row.fields.alternateTitles.forEach((title) => {
                row['searchBlob'] += ' ' + title.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`'~()]/g, '')
              })
            }
          })
        }
        dispatch(receiveLetter(letter, json))
      })
  }
}

export const fetchDefaultDbFavorites = (preview) => {
  // Academic Search Premier, JSTOR, and Scopus
  const alephIds = ['002056133', '001517508', '004862587']
  const url = helper.getContentfulQueryUrl(`content_type=resource&fields.alephSystemNumber[in]=${alephIds.join(',')}&include=0`, preview)

  return dispatch => {
    dispatch(requestDatabaseDefaults())
    return fetch(url)
      .then(response => {
        return response.ok ? response.json() : { status: response.status }
      })
      .then(json => dispatch(receiveDatabaseDefaults(json)))
      .catch(response => {
        dispatch(receiveDatabaseDefaults(response))
      })
  }
}
