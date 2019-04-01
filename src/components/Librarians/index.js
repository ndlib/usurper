import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { fetchLibrarians } from '../../actions/librarians'
import React, { Component } from 'react'
import LibrarianPresenter from './presenter.js'
import * as statuses from '../../constants/APIStatuses'
import { withErrorBoundary } from '../ErrorBoundary'
const mapStateToProps = (state, ownProps) => {
  const { librarianInfo } = state

  const info = (librarianInfo && librarianInfo.netids) ? librarianInfo : { status: statuses.NOT_FOUND }

  return {
    // only those librarians for this page will affect this page
    librarianInfo: info,
    ...ownProps,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchLibrarians }, dispatch)
}

export class LibrariansContainer extends Component {
  componentDidMount () {
    if (this.props.librarianInfo.status !== statuses.FETCHING ||
    !this.props.netids.equals(this.props.librarianInfo.netids)) {
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
