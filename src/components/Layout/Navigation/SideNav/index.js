import { connect } from 'react-redux'
import SideNavPresenter from './presenter.js'

const mapStateToProps = (state) => {
  return {
    ...state,
    search: state.search,
  }
}

export default connect(
  mapStateToProps
)(SideNavPresenter)
