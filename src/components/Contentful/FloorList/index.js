// Container component for array of Floors derived from Contentful
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchFloors } from 'actions/contentful/floors'
import PresenterFactory from 'components/APIPresenterFactory'
import ContentfulFloorsPresenter from './presenter.js'
import Link from 'components/Interactive/Link'
import typy from 'typy'

const mapStateToProps = (state, ownProps) => {
  const locationArray = ownProps.location.pathname.split('/')
  const pathSlug = locationArray[locationArray.length - 1]
  const searchParams = new URLSearchParams(ownProps.location.search)
  const preview = searchParams.get('preview') === 'true'
  const filteredFloors = state.cfAllFloors.json.filter(floor => {
    return typy(floor, 'fields.building.fields.slug').safeString === ownProps.slug && floor.fields.slug !== 'multifloor-building' && floor.fields.slug !== 'hesburgh-14th-floor' && floor.fields.slug !== 'hesburgh-3rd-floor'
  })
  const sortedFloors = filteredFloors.sort((a, b) => {
    return a.fields.floorNumber - b.fields.floorNumber
  })
  const floorData = sortedFloors.map((floor) => {
    const floorsText = (
      <React.Fragment>
        {typy(floor, 'fields.title').safeArray.map(link => {
          return <Link key={floor.sys.id} to={`/floor/${floor.fields.slug}`}>{link}</Link>
        })}
      </React.Fragment>
    )
    const spacesText = (
      <React.Fragment>
        {typy(floor, 'fields.spacesLinks').safeArray.map(link => {
          const linkPath = link.fields.url || link.fields.slug
          const comma = floor.fields.spacesText || ((floor.fields.spacesLinks.length > 1) && (floor.fields.spacesLinks.indexOf(link) !== (floor.fields.spacesLinks.length - 1))) ? ', ' : null
          return (
            <React.Fragment>
              <Link key={link.sys.id} to={`${linkPath}`}>{link.fields.title}</Link>
              {comma}
            </React.Fragment>
          )
        })}
        {floor.fields.spacesText}
      </React.Fragment>
    )
    return {
      ...floor,
      spacesText: spacesText,
      floorsText: floorsText,
    }
  })
  return {
    pathSlug: pathSlug,
    floorData: floorData,
    preview: preview,
    floorsStatus: state.cfAllFloors.status,
  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchFloors }, dispatch)
}

export class ContentfulFloorsContainer extends Component {
  componentDidMount () {
    this.props.fetchFloors(null, this.props.preview)
  }

  render () {
    return (
      <PresenterFactory
        presenter={ContentfulFloorsPresenter}
        status={this.props.floorsStatus}
        props={{ ...this.props }}
      />
    )
  }
}

ContentfulFloorsContainer.propTypes = {
  fetchFloors: PropTypes.func.isRequired,
  floorsStatus: PropTypes.string.isRequired,
  preview: PropTypes.bool.isRequired,
}
const ContentfulFloors = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentfulFloorsContainer)

export default (ContentfulFloors)
