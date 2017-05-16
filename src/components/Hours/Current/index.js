import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchHours } from '../../../actions/hours'
import CurrentHoursPresenter from './presenter.js'
import makeGetHoursForServicePoint from '../../../selectors/hours'
import InlineContainer from '../shared/InlineContainer'

// We  need a way to give each instance of a container access to its own private selector.
// this is done by creating a private instance of the conector for each component.
const makeMapStateToProps = () => {
  const getHoursForServicePoint = makeGetHoursForServicePoint()
  const mapStateToProps = (state, props) => {
    // these props are required for the inline container.
    let ret = {
      jsonHoursApiKey: props.jsonHoursApiKey, // the key to look up hours component in the store used in the selector.
      hoursEntry: getHoursForServicePoint(state, props), // the actual hours used in the selector.
      presenter: CurrentHoursPresenter, // the presenter to show inline.
    }
    return ret
  }
  return mapStateToProps
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchHours }, dispatch)
}

const CurrentHours = connect(
  makeMapStateToProps,
  mapDispatchToProps
)(InlineContainer)

export default CurrentHours
