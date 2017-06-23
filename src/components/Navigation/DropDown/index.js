import React from 'react'
import PropTypes from 'prop-types'
import Menu from '../Menu'
import MenuColumn from '../MenuColumn'
import MenuList from '../MenuColumn/MenuList'

const DropDown = (props) => {
  const columns = props.menuData.map(
      (column, index) => {
        return (
          <MenuColumn
            classes={column.classes}
            title={column.title}
            key={index}
          >
            <MenuList items={column.items} />
          </MenuColumn>)
      })
  return (
    <Menu
      title={props.title}
      landingPage={props.landingPage}
      menuData={props.menuData}
      open={props.open}
      >
      {columns}
    </Menu>
  )
}

DropDown.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string.isRequired,
  landingPage: PropTypes.string,
  menuData: PropTypes.array.isRequired,
}

DropDown.defatultProps = {
  open: false,
}

export default DropDown
