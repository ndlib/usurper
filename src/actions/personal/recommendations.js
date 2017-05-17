import Config from '../../shared/Configuration'
import * as states from './constants'
import * as statuses from '../../constants/APIStatuses'

const recommendURL = Config.recommendAPI + '/recommend'

const handleRecommendations = (dispatch, data) => {
  if (data.recommendations) {
    dispatch(
      states.recievePersonal(
        'recommend',
        statuses.SUCCESS,
        data.recommendations
      )
    )
  }
}

const getRecommendations = () => {
  return (dispatch, getState) => {
    var state = getState().personal

    dispatch(states.requestPersonal('recommend'))
    states.startRequest(
      recommendURL,
      dispatch,
      handleRecommendations,
      state.login.token,
      (e) => {
        dispatch(states.recievePersonal('recommend', statuses.ERROR))
      }
    )
  }
}

export default getRecommendations
