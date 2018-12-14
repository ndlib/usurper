import fetch from 'isomorphic-fetch'
import Config from '../../shared/Configuration'
import * as statuses from '../../constants/APIStatuses'

export const CF_REQUEST_DATABASE_LETTER = 'CF_REQUEST_DATABASE_LETTER'
export const requestLetter = (letter) => {
  return {
    type: CF_REQUEST_DATABASE_LETTER,
    letter,
  }
}

export const CF_RECEIVE_DATABASE_LETTER = 'CF_RECEIVE_DATABASE_LETTER'
const receiveLetter = (letter, response) => {
  let error = {
    type: CF_RECEIVE_DATABASE_LETTER,
    // We won't get a 404, but we will get a 200 and an empty list
    status: response.status === 200 ? statuses.NOT_FOUND : statuses.ERROR,
    letter: letter,
    receivedAt: Date.now(),
  }

  let success = (data) => {
    return {
      type: CF_RECEIVE_DATABASE_LETTER,
      status: statuses.SUCCESS,
      letter: letter,
      data: data,
      receivedAt: Date.now(),
    }
  }

  try {
    if (response[0] && response[0].sys.id) {
      return success(response)
    } else {
      return error
    }
  } catch (e) {
    console.log(e)
    return error
  }
}

export const fetchLetter = (letter, preview) => {
  const query = encodeURIComponent(`content_type=resource&fields.databaseLetter=${letter}`)
  let url = `${Config.contentfulAPI}query?locale=en-US&query=${query}`
  if (preview) { url += `&preview=${preview}` }

  return dispatch => {
    dispatch(requestLetter(letter))
    return fetch(url)
      .then(response => {
        return response.ok ? response.json() : { status: response.status }
      })
      .then(json => {
        json.forEach((row) => {
          row['searchBlob'] = (row.fields.title ? row.fields.title.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`'~()]/g, '') : '')
          if (row.fields.alternateTitles) {
            row.fields.alternateTitles.forEach((title) => {
              row['searchBlob'] += ' ' + title.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`'~()]/g, '')
            })
          }
        })
        dispatch(receiveLetter(letter, json))
      })
      .catch(error => console.log(error))
  }
}
