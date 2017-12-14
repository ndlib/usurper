import React, { Component } from 'react'
import findIP from './findIP'
import lastModified from './lastModified'
import ServiceNowLink from '../ServiceNowLink'

const VERSION = require('../../../VERSION')
const version = window.atob(VERSION.toString().replace('data:application/octet-stream;base64,', ''))

class SiteInfo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ipAddress: 'unknown',
      lastModified: 'unknown',
    }
  }

  componentWillMount () {
    findIP.then(
      ip => {
        this.setState({ ipAddress: ip })
      }
    )

    lastModified.then(
      modified => {
        this.setState({ lastModified: modified })
      }
    )
  }

  render () {
    return (
      <div id='site-info'>
        <h1>Website Information</h1>
        <ServiceNowLink isWebContent>Website Feedback</ServiceNowLink>
        <dl>
          <dt>Website Version:</dt> <dd>{version}</dd>
          <dt>React Version:</dt> <dd>{React.version}</dd>
          <dt>Cache Last Modified:</dt> <dd>{this.state.lastModified}</dd>
          <dt>Referral Path:</dt> <dd>{window.location.search.toString().replace('?URL=', '')}</dd>
          <dt>IP Address:</dt> <dd>{this.state.ipAddress}</dd>
          <dt>User Agent:</dt> <dd>{navigator.userAgent}</dd>
          <dt>Screen Dimensions:</dt> <dd>{window.screen.width}x{window.screen.height}</dd>
          <dt>Window Dimensions:</dt> <dd>{window.innerWidth}x{window.innerHeight}</dd>
        </dl>
      </div>
    )
  }
}

export default SiteInfo
