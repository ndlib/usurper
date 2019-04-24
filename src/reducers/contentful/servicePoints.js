import { CF_REQUEST_SERVICEPOINTS, CF_RECEIVE_SERVICEPOINTS } from 'actions/contentful/servicePoints'
import * as statuses from 'constants/APIStatuses'
import { flattenLocale } from 'shared/ContentfulLibs'

export default (state = { status: statuses.NOT_FETCHED }, action) => {
  switch (action.type) {
    case CF_REQUEST_SERVICEPOINTS:
      return Object.assign({}, state, {
        status: statuses.FETCHING,
      })
    case CF_RECEIVE_SERVICEPOINTS:
      const flattenedServicePoints = action.servicePoints.map((servicePoint) => {
        flattenLocale(servicePoint.fields, 'en-US')
        return servicePoint
      })
      return Object.assign({}, state, {
        status: action.status,
        json: flattenedServicePoints,
      })
    default:
      return state
  }
}
