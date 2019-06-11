import React from 'react'
import PropTypes from 'prop-types'
import MenuListItem from './MenuListItem'
import MenuImage from './MenuImage'
import InternalLink from 'components/Contentful/InternalLink'

const MenuList = (props) => {
  let isImageList = false
  if (props.items) {
    const menuList = props.items.map(
      (item) => {
        if (item && item.fields) {
          if (item.sys.contentType.sys.id === 'internalLink') {
            return (
              <li key={item.sys.id}><InternalLink cfEntry={item} /></li>
            )
          }
          const url = (item.fields.url ? item.fields.url : item.fields.slug) || item.fields.purl

          if (item.image) {
            isImageList = true
            return (
              <MenuImage
                title={item.title}
                url={item.url}
                image={item.image}
                key={item.sys.id} />
            )
          }
          return (
            <MenuListItem
              title={item.fields.alternateTitle ? item.fields.alternateTitle : item.fields.title}
              url={url}
              key={item.sys.id} />
          )
        }
        return null
      }
    )
    if (isImageList) {
      return (
        <dl>{menuList}</dl>
      )
    }
    return (
      <ul className='child'>{menuList}</ul>
    )
  }
  return null
}

MenuList.propTypes = {
  items: PropTypes.array.isRequired,
}
export default MenuList
