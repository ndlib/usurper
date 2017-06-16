import { connect } from 'react-redux'
import React from 'react'

const Error = ({ message = 'An error has occured' }) => (
  <div className={'Error'}>
    <dig className='notfound error'><h1>500</h1>
        <h2>Error</h2>
        <div>{ message }</div></dig>
  </div>
)

export default Error
