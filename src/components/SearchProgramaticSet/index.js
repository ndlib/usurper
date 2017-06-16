import { connect } from 'react-redux'
import SearchProgramaticSet from './presenter.js'
import { openSearchDrawer, closeSearchDrawer, setSearchType } from '../../actions/search.js'

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onGetProps: (open) => {
      if (open) {
        dispatch(openSearchDrawer())
      } else {
        dispatch(closeSearchDrawer())
      }
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchProgramaticSet)
