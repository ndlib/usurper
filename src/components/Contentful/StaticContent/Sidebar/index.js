// Container component for a Floor content type from Contentful
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchSidebar } from 'actions/contentful/staticContent'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PresenterFactory from 'components/APIInlinePresenterFactory'
import Presenter from './presenter.js'
import { withErrorBoundary } from 'components/ErrorBoundary'

import * as statuses from 'constants/APIStatuses'

export const mapStateToProps = (state) => {
  return { cfStatic: state.cfStatic }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchSidebar }, dispatch)
}

export class SidebarContainer extends Component {
  componentDidMount () {
    if (this.props.cfStatic.status === statuses.NOT_FETCHED || this.props.cfStatic.slug !== this.props.slug) {
      this.props.fetchSidebar(this.props.slug, this.props.preview)
    }
  }

  render () {
    if (this.props.cfStatic.slug !== this.props.slug) {
      return null
    }

    return <PresenterFactory
      presenter={Presenter}
      status={this.props.cfStatic.status}
      props={{
        cfStatic: this.props.cfStatic.json,
        inline: this.props.inline,
      }}
      hideLoading={this.props.hideLoading}
    />
  }
}

SidebarContainer.propTypes = {
  fetchSidebar: PropTypes.func.isRequired,
  cfStatic: PropTypes.object.isRequired,
  preview: PropTypes.bool.isRequired,
  slug: PropTypes.string.isRequired,
  hideLoading: PropTypes.bool,
  inline: PropTypes.bool,
}

const Sidebar = connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarContainer)

export default withErrorBoundary(Sidebar)
