import { connect } from 'react-redux'
import React from 'react'
import PageWrapper from '../../PageWrapper'
import '../../../static/css/global.css'

const NotFound = ({ message = 'The requested page could not be found' }) => (
  <PageWrapper>
    <div className={'NotFound'}>
      <h1>Not Found</h1>
      <div>{ message }</div>
    </div>
  </PageWrapper>
)

export default NotFound
