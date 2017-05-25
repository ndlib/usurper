import { connect } from 'react-redux'
import React from 'react'
import PageTitle from '../../PageTitle'

const Error = ({ message = 'An error has occured' }) => (
  <div className={'Error'}>
    <PageTitle title='An Error Occurred' />
    <h1>Error</h1>
    <div>{ message }</div>
  </div>
)

export default Error
