// Container component for a Page content type from Contentful
import { connect } from 'react-redux'
import { fetchServicePointHours } from '../../../actions/hours'
import HoursHomePagePresenter from './presenter.js'

const mapStateToProps = (state, ownProps) => {
  console.log("map")
  console.log(state.hours)
  return { hoursEntry: state.hours }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log("dispatch")
  console.log(ownProps)
  dispatch(fetchServicePointHours(ownProps.jsonHoursApiKey))
  return {}
}

const HomePageHours = connect(
  mapStateToProps,
  mapDispatchToProps
)(HoursHomePagePresenter)

export default HomePageHours
