// Container component for a Page content type from Contentful
import { connect } from 'react-redux'
import { fetchLibrarians } from '../../actions/librarians'
import React from 'react'
import LibrarianPresenter from './presenter.js'

const mapStateToProps = (state, ownProps) => {
  return { librarianInfo: state.librarianInfo }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  dispatch(fetchLibrarians(ownProps.netids))
  return {}
}

const Librarians = connect(
  mapStateToProps,
  mapDispatchToProps
)(LibrarianPresenter)

export default Librarians
