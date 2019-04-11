import Config from '../../shared/Configuration'
import * as states from './constants'
import * as statuses from '../../constants/APIStatuses'

const coursesURL = Config.coursesAPI + '/courses'

const handleCourses = (dispatch, data) => {
  if (data.enrollments || data.instructs) {
    dispatch(
      states.recievePersonal(
        'courses',
        statuses.SUCCESS,
        { courses: data }
      )
    )
  }
}

const getCourses = () => {
  return (dispatch, getState) => {
    const state = getState().personal
    dispatch(states.requestPersonal('courses'))
    states.startRequest(
      coursesURL,
      'GET',
      dispatch,
      handleCourses,
      state.login.token,
      () => {
        dispatch(states.recievePersonal('courses', statuses.ERROR))
      }
    )
  }
}

export default getCourses
