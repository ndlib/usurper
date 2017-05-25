import { connect } from 'react-redux'
import React from 'react'
import PageTitle from '../../PageTitle'

const NotFound = ({ message = 'The requested page could not be found' }) => (
  <div className={'NotFound'}>
    <PageTitle title='Page Not Found' />
    <h1>Not Found</h1>
    <div>{ message }</div>
  </div>
)

export default NotFound
