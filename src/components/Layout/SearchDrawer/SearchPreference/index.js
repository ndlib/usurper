import { connect } from 'react-redux'
import { saveSearchPreference, clearSearchPreference } from 'actions/search.js'
import { setDefaultSearch } from 'actions/personal/settings'
import SearchPreference from './presenter'

const mapStateToProps = (state) => {
  return {
    search: state.search,
  }
}
const mapDispatchToProps = (dispatch, state) => {
  const loggedIn = !!(state.personal && state.personal.login && state.personal.login.token)

  return {
    saveClick: (e) => {
      if ((e.type === 'keydown' && e.keyCode === 13) || e.type === 'click') {
        dispatch(saveSearchPreference(state.currentSearch))
        if (loggedIn) {
          dispatch(setDefaultSearch(state.currentSearch.uid))
        }
      }
    },
    forgetClick: (e) => {
      if ((e.type === 'keydown' && e.keyCode === 13) || e.type === 'click') {
        dispatch(clearSearchPreference())
        if (loggedIn) {
          dispatch(setDefaultSearch(''))
        }
      }
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPreference)
