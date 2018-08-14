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
    status: response.status === 404 ? statuses.NOT_FOUND : statuses.ERROR,
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
    if (response.fields && response.fields[letter]) {
      return success(response.fields[letter])
    } else {
      return error
    }
  } catch (e) {
    console.log(e)
    return error
  }
}

export const fetchLetter = (letter, preview) => {
  let letterEnc = encodeURIComponent(letter)
  const query = encodeURIComponent(`content_type=resource&fields.databaseLetter=${letter}`)
  const url = `${Config.contentfulAPI}query?locale=en-US&query=${query}&preview=${preview}`
  return dispatch => {
    dispatch(requestLetter(letter))
    return fetch(url)
      .then(response => response.ok ? response.json() : { status: response.status })
      .then(json => dispatch(receiveLetter(letter, json)))
      .catch(error => console.log(error))
  }
}
