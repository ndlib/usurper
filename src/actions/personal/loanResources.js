import Config from '../../shared/Configuration'
import * as states from './constants'
import * as statuses from '../../constants/APIStatuses'

const resourcesURL = Config.resourcesAPI + '/items/' // borrowed || pending

function handleResources (dispatch, data) {
  if (data.checkedOut) {
    dispatch(
      states.recievePersonal(
        'resources_have',
        statuses.SUCCESS,
        {
          checkedOut: data.checkedOut,
          web: data.web,
        }
      )
    )
  } else {
    dispatch(
      states.recievePersonal(
        'resources_pending',
        statuses.SUCCESS,
        { pending: data.pending }
      )
    )
  }
}

export default function getResources () {
  return (dispatch, getState) => {
    var state = getState().personal

    dispatch(states.requestPersonal('resources_pending'))
    states.startRequest(
      resourcesURL + 'pending',
      dispatch,
      handleResources,
      state.login.token,
      (e) => {
        dispatch(states.recievePersonal('resources_pending', statuses.ERROR))
      })

    dispatch(states.requestPersonal('resources_have'))
    states.startRequest(
      resourcesURL + 'borrowed',
      dispatch,
      handleResources,
      state.login.token,
      (e) => {
        dispatch(states.recievePersonal('resources_pending', statuses.ERROR))
      }
    )
  }
}
