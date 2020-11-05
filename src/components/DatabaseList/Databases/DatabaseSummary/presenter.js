import React from 'react'
import PropTypes from 'prop-types'

import Link from 'components/Interactive/Link'
import FavoriteIcon from 'components/Account/Preferences/FavoriteIcon'
import { KIND } from 'actions/personal/favorites'
import SummaryLink from './SummaryLink'
import FacetTags from 'components/Interactive/FacetTags'
import Config from 'shared/Configuration'

import styles from '../../style.module.css'

const DatabaseSummary = (props) => {
  return (
    <section aria-label={props.item.fields.title} className={styles.dbSection}>
      <FavoriteIcon kind={KIND.databases} data={props.favoritesData} isFavorited={props.isFavorited} />
      <Link to={props.linkObject.heading.url} title={'Go to ' + props.item.fields.title} className='inline'>
        <h3 className={styles.dbItemTitle}>{props.item.fields.title}</h3>
      </Link>
      { Config.features.subjectFilteringEnabled && (
        <FacetTags entry={props.item} facets={props.facets} onTagClick={props.applySubjectFilter} />
      )}
      <div className={styles.dbSummary}>
        {props.linkObject.heading.description}
      </div>
      <ul className={'linkGroup ' + styles.dbLink}>
        { props.linkObject.conditionalLinks.map((link) => <SummaryLink key={link.keyId} link={link} />) }
      </ul>
      <Link
        to={'/database/' + props.item.sys.id}
        className={styles.moreInfo}
        ariaLabel={'More Information about ' + props.item.fields.title}
      >More info</Link>
    </section>
  )
}

DatabaseSummary.propTypes = {
  item: PropTypes.shape({
    fields: PropTypes.shape({
      title: PropTypes.string,
      subjects: PropTypes.array,
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
  applySubjectFilter: PropTypes.func.isRequired,
  facets: PropTypes.array.isRequired,
}

export default DatabaseSummary
