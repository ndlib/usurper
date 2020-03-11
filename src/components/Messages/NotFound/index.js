import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Presenter from './presenter'
import PresenterFactory from 'components/APIPresenterFactory'

import { fetchAllRedirects } from 'actions/contentful/allRedirects'
import * as statuses from 'constants/APIStatuses'
import * as helper from 'constants/HelperFunctions'

export class NotFoundContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      redirecting: false,
    }
  }

  componentDidMount () {
    if (this.props.fetchStatus === statuses.NOT_FETCHED) {
      const preview = (new URLSearchParams(this.props.history.location.search)).get('preview') === 'true'
      this.props.fetchAllRedirects(preview)
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.fetchStatus === statuses.SUCCESS && prevProps.fetchStatus !== statuses.SUCCESS) {
      // Check for redirect
      let redirectTo = null
      this.props.redirects.find(redirect => {
        // We want to escape the whole fromPath so we can use it as a RegEx, EXCEPT wildcards need to be replaced
        // with the unescape regex equivalent (.*)
        const splitPath = redirect.fromPath.split('*')
        const regexFrom = splitPath.reduce((final, current, index) => {
          return final + (index > 0 ? '(.*)' : '') + helper.escapeRegExp(current)
        }, '')
        const regexp = new RegExp(regexFrom, 'i')
        const matches = this.props.history.location.pathname.match(regexp)
        if (matches) {
          redirectTo = redirect.toPath
          if (redirect.forwardPath) {
            // Use the last wildcard match to determine what subpath to redirect to
            redirectTo = redirectTo + (redirectTo.endsWith('/') ? '' : '/') + matches[matches.length - 1]
          }
          if (redirect.forwardQuery) {
            // Pass along query parameters to redirected page
            redirectTo += this.props.history.location.search
          }
          return redirect
        }
        return null
      })
      if (redirectTo) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          redirecting: true,
        })
        if (redirectTo.startsWith('http')) {
          // Use window.location for external sites
          window.location.replace(redirectTo)
        } else {
          this.props.history.replace(redirectTo)
        }
      }
    }
  }

  render () {
    // If a redirect is found, it may take a moment for the browser to process the redirect.
    // Prevent the "Not Found" presenter from rendering while we wait.
    const status = this.state.redirecting ? statuses.FETCHING : this.props.fetchStatus
    return (
      <PresenterFactory
        presenter={Presenter}
        status={status}
        props={{ message: this.props.message }}
      />
    )
  }
}

export const mapStateToProps = (state) => {
  const { allRedirects } = state

  return {
    fetchStatus: allRedirects.status,
    redirects: allRedirects.json,
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchAllRedirects }, dispatch)
}

NotFoundContainer.propTypes = {
  message: PropTypes.string,
  fetchStatus: PropTypes.string.isRequired,
  redirects: PropTypes.array.isRequired,
  fetchAllRedirects: PropTypes.func.isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string,
    }).isRequired,
  }).isRequired,
}

const NotFound = connect(mapStateToProps, mapDispatchToProps)(NotFoundContainer)

export default NotFound
