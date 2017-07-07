import React from 'react'
import PropTypes from 'prop-types'

const Image = (props) => {
  if (!props.src) {
    return null
  }
  return (
    <div className='frame'>
      <img className={props.className} src={props.src} alt={props.alt} aria-hidden={props.ariaHidden} />
    </div>
  )
}

Image.propTypes = {
  src: PropTypes.string,
  className: PropTypes.string,
  alt: PropTypes.string,
  ariaHidden: PropTypes.bool,

  // removed in container
  cfImage: PropTypes.object,
  defaultImage: PropTypes.string,
}

export default Image
