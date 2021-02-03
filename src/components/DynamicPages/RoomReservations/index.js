// Container component for array of Meeting Spaces derived from Contentful
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchMeetingSpaces } from 'actions/contentful/allMeetingSpaces'
import { fetchSidebar } from 'actions/contentful/staticContent'
import { fetchContacts } from 'actions/contacts'
import PresenterFactory from 'components/APIPresenterFactory'
import RoomReservationsPresenter from './presenter.js'
import * as helper from 'constants/HelperFunctions'
import * as statuses from 'constants/APIStatuses'
import typy from 'typy'

export const mapStateToProps = (state, ownProps) => {
  const combinedStatus = helper.reduceStatuses([
    state.cfAllMeetingSpaces.status,
    state.cfStatic.status,
    state.contactInfo.status,
  ])
  const locationArray = ownProps.location.pathname.split('/')
  const pathSlug = locationArray[locationArray.length - 1]
  const searchParams = new URLSearchParams(ownProps.location.search)
  const preview = searchParams.get('preview') === 'true'
  const meetingSpacesData = state.cfAllMeetingSpaces.json.filter(space => {
    return typy(space, 'fields.type').safeArray.includes('Event Space')
  })
  const cfStatic = state.cfStatic
  const { contactInfo } = state
  const body = state.cfStatic.status === statuses.SUCCESS ? state.cfStatic.json.fields.body.split('{{Table}}') : null
  return {
    body,
    combinedStatus,
    meetingSpacesData,
    pathSlug,
    preview,
    cfStatic,
    contactInfo,
    allMeetingSpacesStatus: state.cfAllMeetingSpaces.status,
    cfStaticStatus: state.cfStatic.status,
    contactInfoStatus: state.contactInfo.status,
  }
}
export const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchMeetingSpaces, fetchSidebar, fetchContacts }, dispatch)
}

export class RoomReservationsContainer extends Component {
  checkFullyLoaded () {
    if (this.props.allMeetingSpacesStatus === statuses.NOT_FETCHED) {
      this.props.fetchMeetingSpaces(this.props.preview)
    }

    if (this.props.cfStaticStatus === statuses.NOT_FETCHED || this.props.cfStatic.slug !== this.props.pathSlug) {
      this.props.fetchSidebar(this.props.pathSlug, this.props.preview)
    }

    if (this.props.contactInfoStatus === statuses.NOT_FETCHED && this.props.allMeetingSpacesStatus === statuses.SUCCESS) {
      const idData = this.props.meetingSpacesData.map(data => {
        return data.fields.contact
      })
      const netids = [...new Set(idData)].filter(data => data)
      this.props.fetchContacts(netids)
    }
  }

  componentDidMount () {
    this.checkFullyLoaded()
  }

  componentDidUpdate () {
    this.checkFullyLoaded()
  }

  render () {
    return (
      <PresenterFactory
        presenter={RoomReservationsPresenter}
        status={this.props.combinedStatus}
        props={{ ...this.props }}
      />
    )
  }
}

RoomReservationsContainer.propTypes = {
  fetchMeetingSpaces: PropTypes.func.isRequired,
  fetchSidebar: PropTypes.func.isRequired,
  fetchContacts: PropTypes.func.isRequired,
  pathSlug: PropTypes.string.isRequired,
  combinedStatus: PropTypes.string.isRequired,
  preview: PropTypes.bool.isRequired,
  allMeetingSpacesStatus: PropTypes.string.isRequired,
  meetingSpacesData: PropTypes.array.isRequired,
  cfStaticStatus: PropTypes.string.isRequired,
  contactInfoStatus: PropTypes.string.isRequired,
  cfStatic: PropTypes.object.isRequired,
  contactInfo: PropTypes.shape({
    status: PropTypes.string,
    contacts: PropTypes.arrayOf(PropTypes.shape({
      netID: PropTypes.string,
    })),
  }),
}
const RoomReservations = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomReservationsContainer)

export default (RoomReservations)
