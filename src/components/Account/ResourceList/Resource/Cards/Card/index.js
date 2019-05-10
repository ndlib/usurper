import React from 'react'
import PropTypes from 'prop-types'

const Card = (props) => {
  const label = (props.label && props.value) ? `${props.label}: ${props.value}` : null
  return (
    <div className={props.className} aria-label={label}>
      {props.children ? props.children : props.value}
    </div>
  )
}

Card.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  children: PropTypes.any,
}

export default Card
