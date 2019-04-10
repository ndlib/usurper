// Container component for a Page content type from Contentful
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchPage } from '../../../actions/contentful/page'
import PresenterFactory from '../../APIPresenterFactory'
import ContentfulPagePresenter from '../Page/presenter.js'
import { withErrorBoundary } from '../../ErrorBoundary'

const mapStateToProps = (state) => {
  return {
    cfPageEntry: state.cfPageEntry,
    personal: state.personal,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchPage }, dispatch)
}

export class ContentfulPageContainer extends Component {
  checkLoggedIn (props) {
    const pageSlug = props.match.params.id
    const preview = (new URLSearchParams(this.props.location.search)).get('preview') === 'true'

    const personal = props.personal
    const isLoggedIn = (personal && personal.login && personal.login.token)

    if (isLoggedIn && props.cfPageEntry.slug !== pageSlug) {
      props.fetchPage(pageSlug, preview, true)
    } else if (props.personal.login.redirectUrl) {
      window.location = props.personal.login.redirectUrl
    }
  }

  componentDidMount () {
    this.checkLoggedIn(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.checkLoggedIn(nextProps)

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
  cfPageEntry: PropTypes.shape({
    status: PropTypes.string,
    json: PropTypes.object,
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
