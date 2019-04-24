import { connect } from 'react-redux'
import SearchProgramaticSet from './presenter.js'
import { openSearchDrawer, closeSearchDrawer } from 'actions/search.js'

const mapDispatchToProps = (dispatch) => {
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
  null,
  mapDispatchToProps
)(SearchProgramaticSet)
