import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/Interactive/Link'
import FavoriteIcon from 'components/Account/Favorites/FavoriteIcon'
import { KIND } from 'actions/personal/favorites'
import SummaryLink from './SummaryLink'

import styles from '../../style.module.css'

const DatabaseSummary = (props) => {
  return (
    <section aria-label={props.item.fields.title} className={styles.dbSection}>
      <FavoriteIcon kind={KIND.databases} data={props.favoritesData} isFavorited={props.isFavorited} />
      <Link to={props.linkObject.heading.url} title={'Go to ' + props.item.fields.title} className='inline'>
        <h2 className={styles.dbItemTitle}>{props.item.fields.title}</h2>
      </Link>
      <ul className={'linkGroup ' + styles.dbLink}>
        { props.linkObject.conditionalLinks.map((link) => <SummaryLink key={link.keyId} link={link} />) }
      </ul>
      <div className={styles.dbSummary}>
        {props.linkObject.heading.description}
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
  linkObject: PropTypes.shape({
    heading: PropTypes.shape({
      url: PropTypes.string,
      description: PropTypes.string,
    }),
    conditionalLinks: PropTypes.arrayOf(PropTypes.shape({
      keyId: PropTypes.string,
    })),
  }),
  isFavorited: PropTypes.bool,
  favoritesData: PropTypes.array,
}

export default DatabaseSummary
