import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'

import Link from 'components/Interactive/Link'
import FavoriteIcon from 'components/Account/Favorites/FavoriteIcon'
import { KIND } from 'actions/personal/favorites'
import SummaryLink from './SummaryLink'
import Tags from 'components/Interactive/Tags'
import Config from 'shared/Configuration'

import styles from '../../style.module.css'

const DatabaseSummary = (props) => {
  const subjectTags = () => {
    const clickHandler = (tag) => {
      props.applySubjectFilter(tag.key)
    }
    return typy(props.item, 'fields.subjects').safeArray.map(subject => ({
      key: subject.sys.id,
      value: subject.linkText,
      onClick: clickHandler,
    }))
  }

  return (
    <section aria-label={props.item.fields.title} className={styles.dbSection}>
      <FavoriteIcon kind={KIND.databases} data={props.favoritesData} isFavorited={props.isFavorited} />
      <Link to={props.linkObject.heading.url} title={'Go to ' + props.item.fields.title} className='inline'>
        <h3 className={styles.dbItemTitle}>{props.item.fields.title}</h3>
      </Link>
      { Config.features.subjectFilteringEnabled && (
        <Tags groups={subjectTags()} />
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
}

export default DatabaseSummary
