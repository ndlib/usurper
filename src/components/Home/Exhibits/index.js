import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { fetchAllExhibits } from 'actions/contentful/allExhibits'
import Presenter from './presenter.js'
import PresenterFactory from 'components/APIInlinePresenterFactory'
import * as statuses from 'constants/APIStatuses'
import * as helper from 'constants/HelperFunctions'

export class HomeExhibitsContainer extends Component {
  componentDidMount () {
    const preview = (new URLSearchParams(this.props.location.search)).get('preview') === 'true'

    if (this.props.allExhibits.status === statuses.NOT_FETCHED) {
      this.props.fetchAllExhibits(preview)
    }
  }

  render () {
    return (
      <PresenterFactory
        presenter={Presenter}
        props={{ entries: this.props.filteredExhibits }}
        status={this.props.allExhibits.status}
      />
    )
  }
}

const mapStateToProps = (state) => {
  let filteredExhibits = []
  if (state.allExhibits.status === statuses.SUCCESS) {
    const now = new Date()

    filteredExhibits = state.allExhibits.json.filter((entry) => {
      // Only use entries which are in the future or ongoing
      const event = entry.event
      return !event || (event.startDate >= now || event.endDate >= now)
    })

    // Limit to 3 exhibits. Ones with the preferOnHomepage field checked will be prioritized
    filteredExhibits = helper.sortList(filteredExhibits, ['preferOnHomepage', 'event.startDate'], 'asc').slice(0, 3)
  }
  return {
    allExhibits: state.allExhibits,
    filteredExhibits,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchAllExhibits }, dispatch)
}

HomeExhibitsContainer.propTypes = {
  fetchAllExhibits: PropTypes.func.isRequired,
  allExhibits: PropTypes.shape({
    status: PropTypes.string.isRequired,
    json: PropTypes.array,
  }).isRequired,
  filteredExhibits: PropTypes.array.isRequired,
  location: PropTypes.shape({
    search: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
  }),
}

const HomeExhibits = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeExhibitsContainer)

export default HomeExhibits
