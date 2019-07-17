import React from 'react'
import PropTypes from 'prop-types'

import Actions from './Actions'
import { hasActions } from './Actions/presenter'
import Cards from './Cards'

import styles from '../style.module.css'

const Resource = (props) => {
  return (
    <div
      className={styles.cardItem + (props.listType === 'history' ? ` ${styles.circHist}` : '')}
      aria-label={props.item.title}
    >
      <Cards isMobileDetails={false} {...props} />
      { hasActions(props.item, props.listType) && (
        <React.Fragment>
          <div className={styles.actionsButton}>
            <span onClick={props.toggleHidden} title='More Actions'>⁝</span>
          </div>
          <div className={props.hidden ? styles.hidden : styles.mobileDetails}>
            <Cards isMobileDetails {...props} />
          </div>
          <div className={props.hidden ? styles.hidden : styles.actions}>
            <Actions item={props.item} listType={props.listType} />
          </div>
        </React.Fragment>
      )}
    </div>
  )
}

Resource.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  toggleHidden: PropTypes.func,
  hidden: PropTypes.bool,
  listType: PropTypes.string.isRequired,
}

Resource.defaultProps = {
  from: 'NDU',
}

export default Resource
