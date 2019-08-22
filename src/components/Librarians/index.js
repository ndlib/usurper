import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { fetchLibrarians } from 'actions/librarians'
import React, { Component } from 'react'
import typy from 'typy'

import LibrarianPresenter from './presenter.js'
import * as statuses from 'constants/APIStatuses'
import { withErrorBoundary } from 'components/ErrorBoundary'

const mapStateToProps = (state, ownProps) => {
  const { librarianInfo } = state

  return {
    // only those librarians for this page will affect this page
    librarianInfo,
    ...ownProps,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchLibrarians }, dispatch)
}

export class LibrariansContainer extends Component {
  componentDidMount () {
    const currentIds = typy(this.props, 'librarianInfo.netids').safeArray
    const newIds = typy(this.props, 'netids').safeArray
    const netIdsModified = newIds.length !== currentIds.length || newIds.some(value => !currentIds.includes(value))
    if (this.props.librarianInfo.status === statuses.NOT_FETCHED || netIdsModified) {
      this.props.fetchLibrarians(this.props.netids)
    }
  }

  render () {
    return <LibrarianPresenter {...this.props} />
  }
}

LibrariansContainer.propTypes = {
  netids: PropTypes.array,
  librarianInfo: PropTypes.object,
  fetchLibrarians: PropTypes.func,
}

const Librarians = connect(
  mapStateToProps,
  mapDispatchToProps
)(LibrariansContainer)

export default withErrorBoundary(Librarians)
