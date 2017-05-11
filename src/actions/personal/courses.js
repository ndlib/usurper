import Config from '../../shared/Configuration'
import * as states from './constants'
import * as statuses from '../../constants/APIStatuses'

const coursesURL = Config.coursesAPI + '/courses'

function handleCourses (dispatch, data) {
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

export default function getCourses () {
  return (dispatch, getState) => {
    var state = getState().personal

    dispatch(states.requestPersonal('courses'))
    states.startRequest(
      coursesURL,
      dispatch,
      handleCourses,
      state.login.token,
      (e) => {
        dispatch(states.recievePersonal('courses', statuses.ERROR))
      }
    )
  }
}
