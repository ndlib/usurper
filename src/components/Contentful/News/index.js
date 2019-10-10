import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchNews } from 'actions/contentful/news'
import PresenterFactory from 'components/APIPresenterFactory'
import ContentfulNewsPresenter from './presenter.js'
import './style.css'
import { withErrorBoundary } from 'components/ErrorBoundary'

export class ContentfulNewsContainer extends Component {
  componentDidMount () {
    const newsSlug = this.props.match.params.id
    this.props.fetchNews(newsSlug, this.props.preview)
  }

  componentWillReceiveProps (nextProps) {
    const slug = this.props.match.params.id
    const nextSlug = nextProps.match.params.id
    if (slug !== nextSlug) {
      this.props.fetchNews(nextSlug, nextProps.preview)
    }
  }

  render () {
    return <PresenterFactory
      presenter={ContentfulNewsPresenter}
      status={this.props.entry.status}
      props={{ entry: this.props.entry.json }} />
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    entry: state.cfNewsEntry,
    preview: (new URLSearchParams(ownProps.location.search)).get('preview') === 'true',
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchNews }, dispatch)
}

ContentfulNewsContainer.propTypes = {
  fetchNews: PropTypes.func.isRequired,
  entry: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  preview: PropTypes.bool,
}

const ContentfulNews = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentfulNewsContainer)

export default withErrorBoundary(ContentfulNews)
