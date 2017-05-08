import React from 'react'
import PropTypes from 'prop-types'

import Image from '../Image'
import Link from '../Link'

function Related ({ className, children }) {
  let items = children
  return (
    <ul className={className}>

      {
        items.map(function (currentItem) {
          let link = currentItem.fields.slug ? currentItem.fields.slug : currentItem.fields.url

          return (
            <li key={currentItem.fields.title}>
              <Link to={link}>
                <Image cfImage={currentItem.fields.image} />
                <span>{currentItem.fields.title}</span>
              </Link>
            </li>
          )
        })
      }

    </ul>
  )
}

Related.propTypes = {
  className: PropTypes.string,
  children: PropTypes.array.isRequired
}

export default Related
