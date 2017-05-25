import { connect } from 'react-redux'
import React from 'react'
import PageTitle from '../../PageTitle'

const Loading = ({ message = '' }) => (
  <div className={'Loading'}>
    <PageTitle title='...' />
    <h1>Loading</h1>
    <div>{ message }</div>
  </div>
)

export default Loading
