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

    if (this.props.exhibitsStatus === statuses.NOT_FETCHED) {
      this.props.fetchAllExhibits(preview)
    }
  }

  render () {
    return (
      <PresenterFactory
        presenter={Presenter}
        props={{ entries: this.props.filteredExhibits }}
        status={this.props.exhibitsStatus}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    exhibitsStatus: state.allExhibits.status,
    filteredExhibits: helper.sortList(state.allExhibits.json || [], ['preferOnHomepage', 'order'], 'asc').slice(0, 3),
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchAllExhibits }, dispatch)
}

HomeExhibitsContainer.propTypes = {
  exhibitsStatus: PropTypes.string.isRequired,
  filteredExhibits: PropTypes.array.isRequired,
  fetchAllExhibits: PropTypes.func.isRequired,
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
