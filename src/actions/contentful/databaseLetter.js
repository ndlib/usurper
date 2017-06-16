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
    error: response,
    receivedAt: Date.now(),
  }

  let success = {
    type: CF_RECEIVE_DATABASE_LETTER,
    status: statuses.SUCCESS,
    letter: response,
    receivedAt: Date.now(),
  }

  try {
    if (response.fields[letter]) {
      return success
    } else {
      return error
    }
  } catch (e) {
    return error
  }
}

export const fetchLetter = (letter, preview) => {
  let url = `${Config.contentfulAPI}/entry?locale=en-US&slug=databases%2f${letter}&preview=${preview}`
  return dispatch => {
    dispatch(requestLetter(letter))
    return fetch(url)
      .then(response => response.ok ? response.json() : { status: response.status })
      .then(json => dispatch(receiveLetter(letter, json)))
      .catch(response => dispatch(receiveLetter(letter, response)))
  }
}
