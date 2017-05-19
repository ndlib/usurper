import { connect } from 'react-redux'
import React from 'react'
import PageWrapper from '../../PageWrapper'
import '../../../static/css/global.css'

const Loading = ({ message = '' }) => (
  <PageWrapper>
    <div className={'Loading'}>
      <h1>Loading</h1>
      <div>{ message }</div>
    </div>
  </PageWrapper>
)

export default Loading
