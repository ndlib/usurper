import React from 'react'
import PropTypes from 'prop-types'

const Image = (props) => {
  return (
    <div className='frame'>
      <img className={props.className} src={props.src} alt={props.alt} aria-hidden={props.ariaHidden} onError={props.onError} />
    </div>
  )
}

Image.propTypes = {
  src: PropTypes.string,
  className: PropTypes.string,
  alt: PropTypes.string,
  ariaHidden: PropTypes.bool,

  onError: PropTypes.func,
}

export default Image
