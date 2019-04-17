import React from 'react'
import PropTypes from 'prop-types'
import Link from '../../../../../Interactive/Link'

const MenuListItem = (props) => {
  return (
    <li><Link to={props.url}>{props.title}</Link></li>
  )
}

MenuListItem.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}
export default MenuListItem
