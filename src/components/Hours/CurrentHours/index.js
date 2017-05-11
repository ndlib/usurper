// Container component for a Page content type from Contentful
import { connect } from 'react-redux'
import { fetchServicePointHours } from '../../../actions/hours'
import HoursHomePagePresenter from './presenter.js'

const mapStateToProps = (state, ownProps) => {
  return { hoursEntry: state.hours }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  dispatch(fetchServicePointHours())
  return {}
}

const HomePageHours = connect(
  mapStateToProps,
  mapDispatchToProps
)(HoursHomePagePresenter)

export default HomePageHours
