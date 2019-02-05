import React from 'react'
import PropTypes from 'prop-types'
import SearchProgramaticSet from '../../SearchProgramaticSet'

const Loading = ({ message = '', title = 'Loading' }) => (
  <div className={'Loading content'}>
    <SearchProgramaticSet open={false} />
    <h1>{ title }</h1>
    <div className='sk-three-bounce'>
      <div className='sk-child sk-bounce1' />
      <div className='sk-child sk-bounce2' />
      <div className='sk-child sk-bounce3' />
    </div>
    <div>{ message }</div>
  </div>
)
Loading.propTypes = {
  message: PropTypes.string,
  title: PropTypes.string,
}

export default Loading
