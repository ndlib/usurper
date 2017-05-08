import React from 'react'
import PropTypes from 'prop-types'

function Image (props) {
  if (!props.src) {
    return null
  }
  return (
    <span className='frame'>
      <img className={props.className} src={props.src} alt={props.alt} />
    </span>
  )
}

Image.propTypes = {
  src: PropTypes.string,
  className: PropTypes.string,
  alt: PropTypes.string,

  // removed in container
  cfImage: PropTypes.object,
}

export default Image
