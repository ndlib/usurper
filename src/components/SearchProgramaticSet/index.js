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
        console.log('open drawer')
        dispatch(openSearchDrawer())
      } else {
        console.log('close drawer')
        dispatch(closeSearchDrawer())
      }
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchProgramaticSet)
