// Container component for a Floor content type from Contentful
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchSidebar } from 'actions/contentful/staticContent'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PresenterFactory from 'components/APIInlinePresenterFactory'
import Presenter from './presenter.js'

import * as statuses from 'constants/APIStatuses'

const mapStateToProps = (state) => {
  return { cfStatic: state.cfStatic }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchSidebar }, dispatch)
}

export class BodyContainer extends Component {
  componentDidMount () {
    if (this.props.cfStatic.status === statuses.NOT_FETCHED ||
    this.props.cfStatic.slug !== this.props.slug) {
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
        showDescription: this.props.showDescription,
        children: this.props.children,
      }}
      hideLoading={this.props.hideLoading}
    />
  }
}

BodyContainer.propTypes = {
  fetchSidebar: PropTypes.func.isRequired,
  cfStatic: PropTypes.object.isRequired,
  preview: PropTypes.bool.isRequired,
  slug: PropTypes.string.isRequired,
  hideLoading: PropTypes.bool,
  showDescription: PropTypes.bool,
  children: PropTypes.node,
}

const Body = connect(
  mapStateToProps,
  mapDispatchToProps
)(BodyContainer)

export default Body
