'use strict'
import { connect } from 'react-redux'
import SearchDrawer from './presenter.js'

const mapStateToProps = (state) => {
  return {
    search: state.search
  }
}

export default connect(mapStateToProps)(SearchDrawer)
