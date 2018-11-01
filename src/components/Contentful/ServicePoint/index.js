// Container component for a Page content type from Contentful
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import CurrentHours from '../../Hours/Current'
import Contact from '../../Contact/ServicePoint'
import { withErrorBoundary } from '../../ErrorBoundary'
import { fetchServicePoints } from '../../../actions/contentful/servicePoints'
import * as statuses from '../../../constants/APIStatuses'

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
    if (this.state.fetchStatus === statuses.NOT_FETCHED && this.state.sp && !this.state.sp.fields) {
      this.props.fetchServicePoints(false, this.state.sp.sys.id)
        .then(function (response) {
          self.setState({ fetchStatus: response.status })
          if (response.servicePoints && response.servicePoints.length) {
            self.setState({ sp: response.servicePoints[0] })
          }
        })
        .catch(function (error) {
          console.warn('Error fetching service points')
          console.error(error)
          self.setState({ fetchStatus: statuses.ERROR })
        })
    }
  }

  render () {
    if (!this.state.sp || !this.state.sp.fields) {
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
            <h4 itemProp='streetAddress'><address>{this.state.sp.fields.address}</address></h4>
            <CurrentHours servicePoint={this.state.sp} />
          </div>
        )}
        <Contact servicePoint={this.state.sp} showDetails={this.props.showDetails} />
      </section>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchServicePoints }, dispatch)
}

ServicePointContainer.propTypes = {
  cfServicePoint: PropTypes.object.isRequired,
  showDetails: PropTypes.bool,
  fetchServicePoints: PropTypes.func.isRequired,
}

ServicePointContainer.defaultProps = {
  showDetails: true,
}

const ServicePoint = connect(null, mapDispatchToProps)(ServicePointContainer)

export default withErrorBoundary(ServicePoint)
