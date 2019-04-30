import Config from 'shared/Configuration'
import * as states from './constants'
import * as statuses from 'constants/APIStatuses'

const recommendURL = Config.recommendAPI + '/recommend'

const handleRecommendations = (dispatch, data) => {
  if (data.recommendations) {
    dispatch(
      states.receivePersonal(
        'recommend',
        statuses.SUCCESS,
        data.recommendations
      )
    )
  }
}

const getRecommendations = () => {
  return (dispatch, getState) => {
    const state = getState().personal

    dispatch(states.requestPersonal('recommend'))
    states.startRequest(
      recommendURL,
      'GET',
      dispatch,
      handleRecommendations,
      state.login.token,
      () => {
        dispatch(states.receivePersonal('recommend', statuses.ERROR))
      }
    )
  }
}

export default getRecommendations
