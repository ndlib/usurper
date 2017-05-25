import React from 'react'
import PropTypes from 'prop-types'

const MenuColumn = (props) => {
  return (
    <div className={props.classes}>
      <h4>{props.title}</h4>
      {props.children}
    </div>
  )
}

MenuColumn.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.element,
  ]).isRequired,
  classes: PropTypes.string,
  title: PropTypes.string.isRequired,
}
export default MenuColumn
