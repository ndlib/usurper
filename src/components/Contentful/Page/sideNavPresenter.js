import React from 'react'
import PropTypes from 'prop-types'

const SideNavPresenter = (props) => {
  let anchors = []
  props.columns.map((column) => {
    column.fields.sections.map((section) => {
      const key = encodeURIComponent(section.fields.title)
      anchors.push((
        <a
          className='side-anchors'
          href={'#' + key}
          key={key}>
          <li >{section.fields.title}</li>
        </a>
      ))
    })
  })

  return (
    <div className='side-nav'><ul>{anchors}</ul></div>
  )
}
export default SideNavPresenter
