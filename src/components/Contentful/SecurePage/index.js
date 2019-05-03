// Container component for a Page content type from Contentful
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchPage } from 'actions/contentful/page'
import PresenterFactory from 'components/APIPresenterFactory'
import ContentfulPagePresenter from '../Page/presenter.js'
import { withErrorBoundary } from 'components/ErrorBoundary'

const mapStateToProps = (state) => {
  return {
    cfPageEntry: state.cfPageEntry,
    login: state.personal.login,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchPage }, dispatch)
}

export class ContentfulPageContainer extends Component {
  constructor (props) {
    super(props)
    this.checkFullyLoaded = this.checkFullyLoaded.bind(this)
  }

  checkFullyLoaded () {
    const pageSlug = this.props.match.params.id
    const preview = (new URLSearchParams(this.props.location.search)).get('preview') === 'true'

    const isLoggedIn = !!(this.props.login && this.props.login.token)

    if (isLoggedIn && this.props.cfPageEntry.slug !== pageSlug) {
      this.props.fetchPage(pageSlug, preview, true)
    } else if (this.props.login.redirectUrl) {
      window.location = this.props.login.redirectUrl
    }
  }

  componentDidMount () {
    this.checkFullyLoaded()
  }

  componentWillReceiveProps (nextProps) {
    this.checkFullyLoaded()

    const slug = this.props.match.params.id
    const nextSlug = nextProps.match.params.id
    if (slug !== nextSlug) {
      this.props.fetchPage(nextSlug)
    }
  }

  render () {
    return <PresenterFactory
      presenter={ContentfulPagePresenter}
      status={this.props.cfPageEntry.status}
      props={{ cfPageEntry: this.props.cfPageEntry.json }} />
  }
}

ContentfulPageContainer.propTypes = {
  login: PropTypes.shape({
    state: PropTypes.string,
    token: PropTypes.string,
    redirectUrl: PropTypes.string,
  }),
  cfPageEntry: PropTypes.shape({
    status: PropTypes.string,
    json: PropTypes.object,
    slug: PropTypes.string,
  }),
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
  fetchPage: PropTypes.func.isRequired,
}

const ContentfulPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentfulPageContainer)

export default withErrorBoundary(ContentfulPage)
