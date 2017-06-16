// Intended to be used as state/status for any components
// that perform async requests to some API or data store
export const NOT_FETCHED = 'API_STATUS_NOT_FETCHED'
export const FETCHING = 'API_STATUS_FETCHING'
export const SUCCESS = 'API_STATUS_SUCCESS'
export const NOT_FOUND = 'API_STATUS_NOT_FOUND'
export const UNAUTHORIZED = 'API_UNAUTHORIZED'
export const ERROR = 'API_STATUS_ERROR'

export const fromHttpStatusCode = (statusCode) => {
  switch (statusCode) {
    case 200:
      return SUCCESS
    case 401:
      return UNAUTHORIZED
    case 404:
      return NOT_FOUND
    default:
      return ERROR
  }
}
