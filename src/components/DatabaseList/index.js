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
    const preview = (new URLSearchParams(this.props.location.search)).get('preview') === 'true'
    this.props.fetchLetter(pageSlug.toLowerCase(), preview)
  }

  componentWillReceiveProps (nextProps) {
    const slug = this.props.match.params.id
    const nextSlug = nextProps.match.params.id
    const preview = (new URLSearchParams(nextProps.location.search)).get('preview') === 'true'
    if (slug !== nextSlug) {
      this.props.fetchLetter(nextSlug.toLowerCase(), preview)
    }
  }

  render () {
    return <ListPresenter cfDatabaseLetter={this.props.cfDatabaseLetter} letter={this.props.match.params.id.toLowerCase()} />
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
