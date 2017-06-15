import React from 'react'
import PropTypes from 'prop-types'

import Image from '../Image'
import Link from '../Link'

const Related = ({ title, className, children }) => {
  if (!children) {
    return null
  }

  return (
    <div>
      <h3>{title}</h3>
      <ul className={className}>

        {
          children.map((currentItem) => {
            let link = currentItem.fields.slug ? currentItem.fields.slug : currentItem.fields.url
            if (!link) {
              link = currentItem.fields.purl
            }

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
    </div>
  )
}

Related.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.array,
}

export default Related
