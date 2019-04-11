import { connect } from 'react-redux'
import SearchInput from './presenter'
import { setSearchOption } from '../../../../../actions/advancedSearch'

const mapStateToProps = (state) => {
  return {
    ...state,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBlur: (e) => {
      dispatch(setSearchOption(e.target.id, e.target.value))
    },
    onKeyDown: (e) => {
      // Enter
      if (e.keyCode === 13) {
        dispatch(setSearchOption(e.target.id, e.target.value))
      }
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchInput)
