import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/Interactive/Link'
import { getLinkObject } from 'shared/ContentfulLibs'
import SummaryLink from './SummaryLink'
import styles from '../../style.module.css'

const DatabaseSummary = (props) => {
  const linkObject = getLinkObject(props.item.fields, props.item.sys.id)
  return (
    <section aria-label={props.item.fields.title} className={styles.dbSection}>
      <Link to={linkObject.heading.url} title={'Go to ' + props.item.fields.title}>
        <h2 className={styles.dbItemTitle}>{props.item.fields.title}</h2>
      </Link>
      <ul className={'linkGroup ' + styles.dbLink}>
        { linkObject.conditionalLinks.map((link) => <SummaryLink key={link.keyId} link={link} />) }
      </ul>
      <div className={styles.dbSummary}>
        {linkObject.heading.description}
      </div>
      <Link
        to={'/database/' + props.item.sys.id}
        className='moreinfo'
        ariaLabel={'More Information about ' + props.item.fields.title}
      >More info</Link>
    </section>
  )
}

DatabaseSummary.propTypes = {
  item: PropTypes.shape({
    fields: PropTypes.shape({
      title: PropTypes.string,
    }),
    sys: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
}

export default DatabaseSummary
