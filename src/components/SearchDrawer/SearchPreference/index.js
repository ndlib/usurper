import { connect } from 'react-redux'
import { saveSearchPreference, clearSearchPreference } from '../../../actions/search.js'
import SearchPreference from './presenter'

const mapStateToProps = (state) => {
  return {
    ...state,
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    saveClick: (e) => {
      if ((e.type === 'keydown' && e.keyCode === 13) || e.type === 'click') {
        dispatch(saveSearchPreference(ownProps.currentSearch))
      }
    },
    forgetClick: (e) => {
      if ((e.type === 'keydown' && e.keyCode === 13) || e.type === 'click') {
        dispatch(clearSearchPreference())
      }
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPreference)
