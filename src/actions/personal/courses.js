import Config from 'shared/Configuration'
import * as states from './constants'
import * as statuses from 'constants/APIStatuses'

const coursesURL = Config.coursesAPI + '/courses'

const handleCourses = (dispatch, data) => {
  if (data.enrollments || data.instructs) {
    dispatch(
      states.receivePersonal(
        'courses',
        statuses.SUCCESS,
        { courseData: data }
      )
    )
  }
}

const getCourses = () => {
  return (dispatch, getState) => {
    const state = getState().personal
    dispatch(states.requestPersonal('courses'))
    return states.startRequest(
      coursesURL,
      'GET',
      dispatch,
      handleCourses,
      state.login.token,
      () => {
        dispatch(states.receivePersonal('courses', statuses.ERROR))
      }
    )
  }
}

export default getCourses
