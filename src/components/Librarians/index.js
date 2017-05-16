import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchLibrarians } from '../../actions/librarians'
import React, { Component } from 'react'
import LibrarianPresenter from './presenter.js'

const mapStateToProps = (state, ownProps) => {
  return {
    librarianInfo: state.librarianInfo,
    ...ownProps,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({ fetchLibrarians }, dispatch)
}

export class LibrariansContainer extends Component {
  componentDidMount(){
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
