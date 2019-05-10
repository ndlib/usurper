import React from 'react'
import PropTypes from 'prop-types'

import nduIcon from 'static/images/icons/ND_monogram.svg'
import hccIcon from 'static/images/icons/HCC.svg'
import illIcon from 'static/images/icons/ILL.svg'

const FromIcon = (props) => {
  let image = nduIcon
  let desc = props.code
  switch (props.code.toUpperCase()) {
    case 'HCC':
      image = hccIcon
      desc = 'Holy Cross College'
      break
    case 'ILL':
      image = illIcon
      desc = 'Interlibrary Loan'
      break
    case 'NDU':
    default:
      image = nduIcon
      desc = 'University of Notre Dame'
  }
  return (
    <span style={{ display: 'inline-block', cursor: 'default' }}>
      <img src={image} alt={desc} title={desc} height='24px' width='24px' />
    </span>
  )
}

FromIcon.propTypes = {
  code: PropTypes.string,
}

FromIcon.defaultProps = {
  code: 'NDU',
}

export default FromIcon
