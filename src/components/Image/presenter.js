import React from 'react'
import PropTypes from 'prop-types'

import './style.css'

const Image = (props) => {
  return (
    <div className={'frame imageContainer' + (props.containerClassName ? ` ${props.containerClassName}` : '')}>
      <img
        className={props.className}
        src={props.src}
        alt={props.alt}
        aria-hidden={props.ariaHidden}
        onError={props.onError}
        itemProp={props.itemProp}
      />
      { props.children && (
        <div className='imageOverlay'>
          {props.children}
        </div>
      )}
    </div>
  )
}

Image.propTypes = {
  src: PropTypes.string,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  alt: PropTypes.string,
  ariaHidden: PropTypes.bool,
  itemProp: PropTypes.string,
  children: PropTypes.any,

  onError: PropTypes.func,
}

export default Image
