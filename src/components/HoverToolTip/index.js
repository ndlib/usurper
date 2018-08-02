import React from 'react'
import './style.css'
const HoverToolTip = (props) => {
  return (
    <span className='tool-tip'>
      <span className='tool-tip-icon' />
      <span className='tool-tip-text'>{props.children}</span>
    </span>
  )
}
export default HoverToolTip
