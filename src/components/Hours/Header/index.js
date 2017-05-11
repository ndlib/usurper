// Container component for a Page content type from Contentful
import { connect } from 'react-redux'
import { fetchServicePointHours } from '../../../actions/hours'
import HoursHeaderPresenter from './presenter.js'

const mapStateToProps = (state, ownProps) => {
  return { hoursEntry: state.hours }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  dispatch(fetchServicePointHours())
  return {}
}

const HoursHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(HoursHeaderPresenter)

export default HoursHeader
