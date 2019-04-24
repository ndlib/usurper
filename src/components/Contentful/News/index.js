import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchNews } from 'actions/contentful/news'
import PresenterFactory from 'components/APIPresenterFactory'
import ContentfulNewsPresenter from './presenter.js'
import './style.css'
import { withErrorBoundary } from 'components/ErrorBoundary'

const mapStateToProps = (state) => {
  return { entry: state.cfNewsEntry }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchNews }, dispatch)
}

export class ContentfulNewsContainer extends Component {
  componentDidMount () {
    const newsSlug = this.props.match.params.id
    const preview = (new URLSearchParams(this.props.location.search)).get('preview') === 'true'
    this.props.fetchNews(newsSlug, preview, false)
  }

  componentWillReceiveProps (nextProps) {
    const slug = this.props.match.params.id
    const nextSlug = nextProps.match.params.id
    if (slug !== nextSlug) {
      this.props.fetchNews(nextSlug)
    }
  }

  render () {
    return <PresenterFactory
      presenter={ContentfulNewsPresenter}
      status={this.props.entry.status}
      props={{ entry: this.props.entry.json }} />
  }
}

ContentfulNewsContainer.propTypes = {
  fetchNews: PropTypes.func.isRequired,
  entry: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
}

const ContentfulNews = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentfulNewsContainer)

export default withErrorBoundary(ContentfulNews)
