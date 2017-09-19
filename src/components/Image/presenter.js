import React from 'react'
import PropTypes from 'prop-types'

const Image = (props) => {
  return (
    <div className='frame'>
      <img
        className={props.className}
        src={props.src}
        alt={props.alt}
        aria-hidden={props.ariaHidden}
        onError={props.onError}
        itemProp={props.itemProp}
      />
    </div>
  )
}

Image.propTypes = {
  src: PropTypes.string,
  className: PropTypes.string,
  alt: PropTypes.string,
  ariaHidden: PropTypes.bool,
  itemProp: PropTypes.string,

  onError: PropTypes.func,
}

export default Image
