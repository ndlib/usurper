import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { fetchAllNews } from 'actions/contentful/allNews'
import Presenter from './presenter.js'
import PresenterFactory from 'components/APIInlinePresenterFactory'
import * as statuses from 'constants/APIStatuses'
import { flattenLocale } from 'shared/ContentfulLibs'
import { withErrorBoundary } from 'components/ErrorBoundary'

import { sortNews } from '../../Home/News'

const mapStateToProps = (state) => {
  let allNews = []
  if (state.allNews && state.allNews.status === statuses.SUCCESS) {
    allNews = state.allNews.json
      .map((entry) => {
        flattenLocale(entry.fields, 'en-US')
        return entry
      })
      .sort(sortNews)
  }
  return {
    allNews,
    allNewsStatus: state.allNews.status,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchAllNews }, dispatch)
}

export class AllNewsContainer extends Component {
  componentDidMount () {
    if (this.props.allNewsStatus === statuses.NOT_FETCHED) {
      this.props.fetchAllNews(false)
    }
  }

  render () {
    return (
      <PresenterFactory
        presenter={Presenter}
        props={this.props.allNews}
        status={this.props.allNewsStatus} />
    )
  }
}

AllNewsContainer.propTypes = {
  allNewsStatus: PropTypes.string.isRequired,
  fetchAllNews: PropTypes.func.isRequired,
  allNews: PropTypes.array.isRequired,
}

const HoursPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(AllNewsContainer)

export default withErrorBoundary(HoursPage)
