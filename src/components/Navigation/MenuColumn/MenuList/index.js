import React from 'react'
import PropTypes from 'prop-types'
import MenuListItem from './MenuListItem'

const MenuList = (props) => {
  if (props.items) {
    const menuList = props.items.map(
      (item, index) => {
        return (
          <MenuListItem title={item.title} url={item.url} key={index} />
        )
      }
    )
    return (
      <ul className='child' >{menuList}</ul>
    )
  }
  return null
}

MenuList.propTypes = {
  items: PropTypes.array.isRequired,
}
export default MenuList
