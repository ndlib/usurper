import React from 'react'
import PropTypes from 'prop-types'

import Image from '../Image'
import Link from '../Link'
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
            // span will mess with the layout and should be replaced with
            // React.Fragment when upgrading to 16+ then we can drop the
            // if/else statement
            if (linkObject.links.length > 1) {
              return (
                <span style={{ display:'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                  {
                    linkObject.links.map((l) => {
                      return (
                        <li key={l.keyId}>
                          <Link to={l.url} key={l.keyId}>
                            {image}
                            <span>{l.title}</span>
                          </Link>
                        </li>
                      )
                    })
                  }
                </span>
              )
            } else {
              return (
                <li key={currentItem.fields.title}>
                  <Link to={linkObject.links[0].url}>
                    {image}
                    <span>{currentItem.fields.title}</span>
                  </Link>
                </li>
              )
            }
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
