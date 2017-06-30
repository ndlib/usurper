import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchLibrarians } from '../../actions/librarians'
import React, { Component } from 'react'
import LibrarianPresenter from './presenter.js'
import * as statuses from '../../constants/APIStatuses'

const mapStateToProps = (state, ownProps) => {
  return {
    // only those librarians for this page will affect this page
    librarianInfo: ownProps.netids === state.librarianInfo.netids ? state.librarianInfo : statuses.NOT_FOUND,
    ...ownProps,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({ fetchLibrarians }, dispatch)
}

export class LibrariansContainer extends Component {
  componentDidMount () {
    this.props.fetchLibrarians(this.props.netids)
  }

  render () {
    return <LibrarianPresenter {...this.props} />
  }
}

const Librarians = connect(
  mapStateToProps,
  mapDispatchToProps
)(LibrariansContainer)

export default Librarians
