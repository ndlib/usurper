import { connect } from 'react-redux'
import React from 'react'
import PageWrapper from '../../PageWrapper'
import '../../../static/css/global.css'

const Error = ({ message = 'An error has occured' }) => (
  <PageWrapper>
    <div className={'Error'}>
      <h1>Error</h1>
      <div>{ message }</div>
    </div>
  </PageWrapper>
)

export default Error
