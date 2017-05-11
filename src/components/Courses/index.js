import { connect } from 'react-redux'

import Courses from './presenter'

function mapStateToProps (state) {
  const { personal } = state
  return { login: personal.login, courses: personal.courses }
}

export default connect(mapStateToProps)(Courses)
