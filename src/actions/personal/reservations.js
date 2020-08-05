import typy from 'typy'
import Config from 'shared/Configuration'
import * as states from './constants'
import * as statuses from 'constants/APIStatuses'

const handleReceive = (dispatch, data) => {
  if (typy(data).isArray) {
    dispatch(
      states.receivePersonal(
        'reservations',
        statuses.SUCCESS,
        { data: data },
      )
    )
  }
}

const handleError = (dispatch) => {
  dispatch(states.receivePersonal('reservations', statuses.ERROR))
}

export const getReservations = (startDate, endDate) => {
  return (dispatch, getState) => {
    const state = getState().personal
    dispatch(states.requestPersonal('reservations'))

    const url = `${Config.libcalGatewayAPI}/space/bookings?startDate=${startDate || ''}&endDate=${endDate || ''}`
    states.startRequest(
      url,
      'GET',
      dispatch,
      handleReceive,
      state.login.token,
      () => handleError(dispatch),
    )
  }
}
