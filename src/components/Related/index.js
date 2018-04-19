import React from 'react'
import PropTypes from 'prop-types'

import Image from '../Image'
import Link from '../Link'
import LibMarkdown from '../LibMarkdown'
import { getLinkObject } from '../../shared/ContentfulLibs'

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
      { title && <h3>{title}</h3> }
      <ul className={className}>
        {
          childrenWithFields.map((currentItem) => {
            let linkObject = getLinkObject(currentItem.fields, currentItem.sys.id)

            let image = ''
            if (showImages) {
              image = (<Image cfImage={currentItem.fields.image} />)
            }

            return (
              <li key={currentItem.fields.title}>
                <Link to={linkObject.heading.url} className={className + '-mainLink'}>
                  {image}
                  <span>{currentItem.fields.title}</span>
                </Link>
                <ul className={className + '-sublinks'}>
                  {
                    linkObject.conditionalLinks.map((link) => {
                      return (
                        <li key={link.keyId}>
                          <Link to={link.url}>{link.title}</Link>
                          { link.notes && <LibMarkdown>{ link.notes }</LibMarkdown> }
                        </li>
                      )
                    })
                  }
                </ul>
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
