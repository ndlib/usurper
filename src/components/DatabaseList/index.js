// Container component for a Page content type from Contentful
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchLetter } from '../../actions/contentful/databaseLetter'
import PresenterFactory from '../APIPresenterFactory'
import ListPresenter from './presenter.js'

const mapStateToProps = (state) => {
  return { cfDatabaseLetter: state.cfDatabaseLetter }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchLetter }, dispatch)
}

export class DatabaseListContainer extends Component {
  componentDidMount () {
    const pageSlug = this.props.match.params.id
    this.props.fetchLetter(pageSlug, false)
  }

  componentWillReceiveProps (nextProps) {
    const slug = this.props.match.params.id
    const nextSlug = nextProps.match.params.id
    if (slug !== nextSlug) {
      this.props.fetchLetter(nextSlug, false)
    }
  }

  render () {
    return <ListPresenter cfDatabaseLetter={this.props.cfDatabaseLetter} letter={this.props.match.params.id} />
  }
}

DatabaseListContainer.propTypes = {
  fetchLetter: PropTypes.func.isRequired,
  cfDatabaseLetter: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}

const DatabaseList = connect(
  mapStateToProps,
  mapDispatchToProps
)(DatabaseListContainer)

export default DatabaseList
