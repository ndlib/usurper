import React from 'react'
import PropTypes from 'prop-types'

import Image from '../Image'
import Link from '../Link'

const Related = ({ title, className, showImages, children }) => {
  if (!children) {
    return null
  }
  const childrenWithFields = children.filter(child => child.fields !== undefined)
  if (childrenWithFields.length === 0) {
    return null
  }

  return (
    <section aria-label={title}>
      { title && <h2>{title}</h2> }
      <ul className={className}>

        {
          childrenWithFields.map((currentItem) => {
            let link = currentItem.fields.slug ? currentItem.fields.slug : currentItem.fields.url
            if (!link) {
              link = currentItem.fields.purl
            }
            let image = ''
            if (showImages) {
              image = (<Image cfImage={currentItem.fields.image} />)
            }
            return (
              <li key={currentItem.fields.title}>
                <Link to={link}>
                  {image}
                  <span>{currentItem.fields.title}</span>
                </Link>
              </li>
            )
          })
        }

      </ul>
    </section>
  )
}

Related.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  showImages: PropTypes.bool,
  children: PropTypes.array,
}

Related.defaultProps = {
  showImages: true,
}

export default Related
