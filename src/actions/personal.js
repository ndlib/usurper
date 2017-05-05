import Config from '../shared/Configuration'

// ------------------------------------
// Constants
// ------------------------------------
export const PERSONAL_INFO = 'PERSONAL_INFO'
export const PERSONAL_INFO_CLEAR = 'PERSONAL_INFO_CLEAR'
export const PERSONAL_RETREIVING = 'PERSONAL_RETREIVING'

const loginUrl = Config.viceroyAPI + '/token'
const personURL = Config.personAPI + '/person'
const recommendURL = Config.recommendAPI + '/recommend'
const coursesURL = Config.coursesAPI + '/courses'
const resourcesURL = Config.resourcesAPI + '/items/' // borrowed || pending

// ------------------------------------
// Actions
// ------------------------------------
function updatePersonalInfo (info = {}) {
  return {
    type    : PERSONAL_INFO,
    payload : info
  }
}

function clearPersonalInfo () {
  return {
    type    : PERSONAL_INFO_CLEAR
  }
}

// keep track of what do and don't have an active request or for.
function retreivingPersonal (requestType = '', retrieving = true) {
  return {
    type: PERSONAL_RETREIVING,
    requestType: requestType,
    retrieving: retrieving
  }
}

function handleToken (dispatch, shouldRedirect, data) {
  if (data.redirect && shouldRedirect) {
    window.location.href = data.redirect
  } else if (data.jwt) {
    dispatch(updatePersonalInfo({ token: data.jwt }))
  }
  dispatch(retreivingPersonal('gettingToken', false))
}

function handlePerson (dispatch, data) {
  if (data.person && data.person.entries.length > 0) {
    var person = data.person
    if (person.entries.length > 1) {
      console.log('got more than one person for this netid??')
    }
    person = person.entries[0]
    dispatch(updatePersonalInfo(person))
  }
  dispatch(retreivingPersonal('retrievingPerson', false))
}

function handleRecommendations (dispatch, data) {
  if (data.recommendations) {
    dispatch(updatePersonalInfo({ recommend: data.recommendations }))
  }
  dispatch(retreivingPersonal('gettingRecommendations', false))
}

function handleCourses (dispatch, data) {
  if (data.enrollments || data.instructs) {
    dispatch(updatePersonalInfo({ courses: data }))
  }
  dispatch(retreivingPersonal('gettingCourses', false))
}

function handleResources (dispatch, data) {
  if (data.checkedOut) {
    dispatch(updatePersonalInfo({ resources_have: { checkedOut: data.checkedOut, web: data.web } }))
  } else {
    dispatch(updatePersonalInfo({ resources_pending: { pending: data.pending } }))
  }
  dispatch(retreivingPersonal('gettingResources', false))
}

function errorFunc (info) {
  console.log(info)
}

function request (url, success, token) {
  let request = new XMLHttpRequest()
  request.open('GET', url, true)
  request.responseType = 'json'
  request.timeout = 0
  request.setRequestHeader('Authorization', token)
  request.onload = function (data) {
    if (request.status >= 200 && request.status < 400) {
      // We must parse the response for QA tests because the testing framework doesn't return JSON objects
      var response = data.currentTarget.response
      if (typeof response === 'string') {
        response = JSON.parse(response)
      }
      success(response)
    } else {
      errorFunc(data)
    }
  }
  request.send()
}

function getToken (dispatch, getState, shouldRedirect = true) {
  var state = getState().personal
  if (state['token']) {
    return true
  }

  if (state['gettingToken']) {
    return false
  }
  dispatch(retreivingPersonal('gettingToken'))

  let request = new XMLHttpRequest()
  request.open('GET', loginUrl, true)
  request.responseType = 'json'
  request.timeout = 3000
  request.withCredentials = true
  request.onload = function (data) {
    if (request.status >= 200 && request.status < 400) {
      // We must parse the response for QA tests because the testing framework doesn't return JSON objects
      var response = this.response
      if (typeof response === 'string') {
        response = JSON.parse(response)
      }
      handleToken(dispatch, shouldRedirect, response)
    } else {
      errorFunc(data)
    }
  }
  request.onerror = function () {
    dispatch(retreivingPersonal('gettingToken', false))
    errorFunc(null)
  }
  request.send()
  return false
}

function startRequest (dispatch, getState, url, func, stateKey) {
  var state = getState().personal
  if (state[stateKey]) {
    return true
  }
  dispatch(retreivingPersonal(stateKey))
  request(url, func.bind(null, dispatch), getState().personal.token)
  return false
}

function getInfo (redirect = true) {
  var hasInfo = true
  return (dispatch, getState) => {
    var state = getState().personal
    if (!state.token) {
      hasInfo = getToken(dispatch, getState, redirect)
    } else {
      if (!state.netid) {
        startRequest(dispatch, getState, personURL, handlePerson, 'gettingPerson')
      }
      // Until we have shibboleth, we can't use this anyway
      // if(!state.recommend) {
      //   startRequest(dispatch, getState, recommendURL, handleRecommendations, 'gettingRecommendations')
      // }
      if (!state.courses) {
        startRequest(dispatch, getState, coursesURL, handleCourses, 'gettingCourses')
      }
      if (!state.resources) {
        startRequest(dispatch, getState, resourcesURL + 'borrowed', handleResources, 'gettingBorrowed')
        startRequest(dispatch, getState, resourcesURL + 'pending', handleResources, 'gettingPending')
      }
    }
    return hasInfo
  }
}

export const actions = {
  getInfo,

  updatePersonalInfo,
  clearPersonalInfo
}
