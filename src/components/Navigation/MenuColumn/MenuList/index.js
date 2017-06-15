import React from 'react'
import PropTypes from 'prop-types'
import MenuListItem from './MenuListItem'
import MenuImage from './MenuImage'

const MenuList = (props) => {
  let isImageList = false
  if (props.items) {
    const menuList = props.items.map(
      (item, index) => {
        if (item.image) {
          isImageList = true
          return (
            <MenuImage title={item.title} url={item.url} image={item.image} key={index} />
          )
        }
        return (
          <MenuListItem title={item.title} url={item.url} key={index} />
        )
      }
    )
    if (isImageList) {
      return (
        <dl>{menuList}</dl>
      )
    }
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