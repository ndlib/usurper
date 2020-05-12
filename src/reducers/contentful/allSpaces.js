import typy from 'typy'
import {
  CF_REQUEST_ALL_SPACES,
  CF_RECEIVE_ALL_SPACES,
} from 'actions/contentful/allSpaces'
import * as helper from 'constants/HelperFunctions'
import * as statuses from 'constants/APIStatuses'

export default (state = { status: statuses.NOT_FETCHED }, action) => {
  switch (action.type) {
    case CF_REQUEST_ALL_SPACES:
      return Object.assign({}, state, {
        status: statuses.FETCHING,
      })
    case CF_RECEIVE_ALL_SPACES:
      return Object.assign({}, state, {
        status: action.status,
        json: typy(action.allSpaces).safeArray.map(mapSpace),
      })
    default:
      return state
  }
}

const mapSpace = (space) => {
  // Determine if the room is reservable based on presence of libCalId, and if so, add that as a feature
  const newFeatures = helper.sortList(typy(space, 'fields.features').safeArray)
  if (typy(space, 'fields.libCalId').isTruthy || typy(space, 'fields.reservationUrl').isTruthy) {
    newFeatures.push('Reservable')
  }

  return {
    ...space,
    fields: {
      ...space.fields,
      reservationUrl: space.fields.reservationUrl ||
        (space.fields.libCalId ? `http://libcal.library.nd.edu/space/${space.fields.libCalId}` : null),
      features: newFeatures,
    },
  }
}
