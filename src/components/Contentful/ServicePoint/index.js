// Container component for a Page content type from Contentful
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import CurrentHours from 'components/Hours/Current'
import Contact from 'components/Contact/ServicePoint'
import { withErrorBoundary } from 'components/ErrorBoundary'
import { fetchServicePoints, fetchServicePointBySlug } from 'actions/contentful/servicePoints'
import * as statuses from 'constants/APIStatuses'

export class ServicePointContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      fetchStatus: statuses.NOT_FETCHED,
      sp: props.cfServicePoint,
    }
  }

  componentDidMount () {
    const self = this
    const successCallback = (response) => {
      self.setState({ fetchStatus: response.status })
      if (response.servicePoints && response.servicePoints.length) {
        self.setState({ sp: response.servicePoints[0] })
      } else if (response.data) {
        self.setState({ sp: response.data })
      }
    }
    const errorCallback = (error) => {
      console.warn('Error fetching service points')
      console.error(error)
      self.setState({ fetchStatus: statuses.ERROR })
    }

    if (this.state.fetchStatus === statuses.NOT_FETCHED) {
      if (this.state.sp && !this.state.sp.fields) {
        this.props.fetchServicePoints(this.props.preview, this.state.sp.sys.id)
          .then(successCallback).catch(errorCallback)
      } else if (this.props.slug) {
        this.props.fetchServicePointBySlug(this.props.slug, this.props.preview)
          .then(successCallback).catch(errorCallback)
      }
    }
  }

  render () {
    if (!this.state.sp || !this.state.sp.fields || (this.props.slug && this.state.sp.fields.slug !== this.props.slug)) {
      return null
    }

    return (
      <section
        aria-label={'Service Point: ' + this.state.sp.fields.title}
        role='complementary'
        className='sp-address'
        itemScope
        itemType='http://schema.org/Place'
      >
        <h2 itemProp='name'>{this.state.sp.fields.title}</h2>
        { this.props.showDetails && (
          <div>
            { this.state.sp.fields.address !== this.state.sp.fields.title && (
              <h4 itemProp='streetAddress'><address>{this.state.sp.fields.address}</address></h4>
            )}
            <CurrentHours servicePoint={this.state.sp} />
          </div>
        )}
        <Contact servicePoint={this.state.sp} showDetails={this.props.showDetails} />
      </section>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchServicePoints, fetchServicePointBySlug }, dispatch)
}

// Custom required validation - see https://stackoverflow.com/questions/42284076/at-least-one-required-prop-in-react
const requiredPropsCheck = (props, propName, componentName) => {
  if (!props.cfServicePoint && !props.slug) {
    return new Error(`One of 'cfServicePoint' or 'slug' are required by '${componentName}' component.`)
  }
}

ServicePointContainer.propTypes = {
  cfServicePoint: requiredPropsCheck,
  showDetails: PropTypes.bool,
  fetchServicePoints: PropTypes.func.isRequired,
  fetchServicePointBySlug: PropTypes.func.isRequired,
  slug: requiredPropsCheck,
  preview: PropTypes.bool,
}

ServicePointContainer.defaultProps = {
  showDetails: true,
  preview: false,
}

const ServicePoint = connect(null, mapDispatchToProps)(ServicePointContainer)

export default withErrorBoundary(ServicePoint)
