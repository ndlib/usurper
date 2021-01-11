import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import Link from 'components/Interactive/Link'
import LibMarkdown from 'components/LibMarkdown'
import { getLinkObject } from 'shared/ContentfulLibs'
import InternalLink from 'components/Contentful/InternalLink'

const Section = (props) => {
  const s = props.entry.fields
  if (!props.entry || !props.entry.fields || !props.entry.fields.displayName) {
    return null
  }
  return (
    <section key={props.entry.sys.id} className='group'>
      <h2><span id={encodeURIComponent(s.displayName)}>{s.displayName}</span></h2>
      <LibMarkdown>{ s.body }</LibMarkdown>
      <div className='linksgroup'>
        <div role={s.displayName + ' navigation'}>
          {typy(s.items).safeArray.map((item) => {
            if (item.sys.contentType.sys.id === 'internalLink') {
              return (
                <p key={item.sys.id}><InternalLink cfEntry={item} /></p>
              )
            }
            const linkObject = getLinkObject(item.fields, item.sys.id)
            return (
              <p key={item.sys.id}>
                <Link to={linkObject.heading.url} className='item-title'>{linkObject.heading.title}</Link>
                <span className='linkGroup'>
                  {linkObject.conditionalLinks.map((data) => {
                    return data.url && <li key={data.keyId}><Link to={data.url}>{data.title}</Link></li>
                  })}
                </span>
                {props.showDescriptions && (
                  <span>{linkObject.heading.description}</span>
                )}
              </p>
            )
          })}
        </div>
      </div>
    </section>
  )
}

Section.propTypes = {
  entry: PropTypes.shape({
    sys: PropTypes.object.isRequired,
    fields: PropTypes.shape({
      displayName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  showDescriptions: PropTypes.bool,
}

export default Section
