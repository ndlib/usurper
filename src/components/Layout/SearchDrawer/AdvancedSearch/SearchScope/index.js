import { connect } from 'react-redux'
import SearchScope from './presenter'
import { setSearchOption } from 'actions/advancedSearch'

const mapStateToProps = (state) => {
  return {
    ...state,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (e) => {
      dispatch(setSearchOption(e.target.id, e.target.value))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchScope)
