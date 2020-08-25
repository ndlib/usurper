import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'

import Image from 'components/Image'
import Link from 'components/Interactive/Link'
import LibMarkdown from 'components/LibMarkdown'
import { getLinkObject } from 'shared/ContentfulLibs'
import InternalLink from '../InternalLink'

const Related = ({ title, className, showImages, children }) => {
  if (!children) {
    return null
  }
  const childrenWithFields = children.filter(
    child => {
      return child && child.fields !== undefined
    }
  )
  if (childrenWithFields.length === 0) {
    return null
  }

  return (
    <section aria-label={title}>
      { title && <h2>{title}</h2> }
      <ul className={className}>
        {
          childrenWithFields.map((currentItem) => {
            const linkObject = getLinkObject(currentItem.fields, currentItem.sys.id)

            let image = ''
            if (showImages) {
              image = (<Image cfImage={currentItem.fields.image} />)
            }

            return (
              <li key={currentItem.fields.title}>
                {typy(currentItem, 'sys.contentType.sys.id').safeString === 'internalLink' ? (
                  <InternalLink cfEntry={currentItem} className={className + '-mainLink'} />
                ) : (
                  <Link to={linkObject.heading.url} className={className + '-mainLink'}>
                    {image}
                    <span>{currentItem.fields.title}</span>
                  </Link>
                )}
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
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
}

Related.defaultProps = {
  showImages: true,
}

export default Related
