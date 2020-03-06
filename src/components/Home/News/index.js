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
import Config from 'shared/Configuration'

export const sortNews = (left, right, withPreferred = false) => {
  const a = new Date(left.fields.publishedDate)
  const b = new Date(right.fields.publishedDate)

  if (withPreferred) {
    const aPreferred = left.fields.preferOnHomepage
    const bPreferred = right.fields.preferOnHomepage

    if (aPreferred && !bPreferred) {
      return -1
    } else if (bPreferred && !aPreferred) {
      return 1
    }
  }

  if (a < b) {
    return 1
  } else if (b < a) {
    return -1
  }
  return 0
}

export class AllNewsContainer extends Component {
  componentDidMount () {
    if (this.props.allNewsStatus === statuses.NOT_FETCHED) {
      const preview = (new URLSearchParams(this.props.location.search)).get('preview') === 'true'
      this.props.fetchAllNews(preview)
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

const mapStateToProps = (state) => {
  let allNews = []
  if (state.allNews && state.allNews.status === statuses.SUCCESS) {
    allNews = state.allNews.json
      .map((entry) => {
        flattenLocale(entry.fields, 'en-US')
        return entry
      })
      .sort((a, b) => sortNews(a, b, true))
      .slice(0, Config.features.exhibitsEnabled ? 4 : 3)
  }
  return {
    allNews,
    allNewsStatus: state.allNews.status,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchAllNews }, dispatch)
}

AllNewsContainer.propTypes = {
  allNewsStatus: PropTypes.string.isRequired,
  fetchAllNews: PropTypes.func.isRequired,
  allNews: PropTypes.array.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
}

const AllNews = connect(
  mapStateToProps,
  mapDispatchToProps
)(AllNewsContainer)

export default withErrorBoundary(AllNews)
