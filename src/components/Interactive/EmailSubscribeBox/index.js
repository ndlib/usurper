import React from 'react'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import typy from 'typy'

import Config from 'shared/Configuration'
import Link from 'components/Interactive/Link'

import styles from './style.module.css'

const EmailSubscribeBox = (props) => {
  const location = useLocation()

  if (!Config.features.emailSubscriptionsEnabled) {
    return null
  }

  const hNum = typy(props.htag).isNumber ? props.htag : parseInt(props.htag.replace('h', ''), 10)
  const headerTextEl = React.createElement((hNum > 0 && hNum <= 6) ? ('h' + hNum) : 'span', {
    className: styles.headerText,
  }, 'Subscribe to Events')

  const linkUrl = `email/subscribe${location.search || ''}`
  return (
    <div className={styles.box}>
      { headerTextEl }
      <div className={styles.boxBody}>
        Sign up to receive email updates for specific types of events.
        <Link to={linkUrl} className={`button ${styles.subscribeButton}`}>Subscribe</Link>
      </div>
    </div>
  )
}

EmailSubscribeBox.propTypes = {
  htag: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string, // Ex: '1', '4', 'h2', 'h4', etc.
  ]),
}

EmailSubscribeBox.defaultProps = {
  htag: 0,
}

export default EmailSubscribeBox
