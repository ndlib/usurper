import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { fetchAllNews } from '../../../actions/contentful/allNews'
import Presenter from './presenter.js'
import PresenterFactory from '../../APIPresenterFactory'
import * as statuses from '../../../constants/APIStatuses'
import { flattenLocale } from '../../../shared/ContentfulLibs'

const mapStateToProps = (state) => {
  let allNews = []
  if (state.allNews && state.allNews.status === statuses.SUCCESS) {
    let now = new Date()

    allNews = state.allNews.json
      .map((entry) => {
        flattenLocale(entry.fields, 'en-US')
        return entry
      })
      .filter((entry) => {
        let start = new Date(entry.fields.displayStartDate)
        let end = new Date(entry.fields.displayEndDate)
        return start <= now && end >= now
      })
      .sort((left, right) => {
        let a = new Date(left.fields.displayStartDate)
        let b = new Date(right.fields.displayStartDate)

        if (a < b) {
          return 1
        } else if (b < a) {
          return -1
        }
        return 0
      })
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
      this.props.fetchAllNews('publish')
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

PropTypes.propTypes = {
  allNewsStatus: PropTypes.string.isRequired,
  fetchAllNews: PropTypes.func.isRequired,
}

const HoursPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(AllNewsContainer)

export default HoursPage
