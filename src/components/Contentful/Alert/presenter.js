import React from 'react'
import PropTypes from 'prop-types'

import { withErrorBoundary } from 'components/ErrorBoundary'
import LibMarkdown from 'components/LibMarkdown'

import styles from './style.module.css'

const Alert = ({ alerts, hiddenIds }) => {
  let someHidden = false
  return (
    <div className='alerts'>
      {
        // go through each alert type, putting all similar alerts into the same box
        Object.keys(alerts).map(type => {
          const currentAlerts = alerts[type].filter(alert => !hiddenIds || !hiddenIds.includes(alert.id))
          if (currentAlerts.length < alerts[type].length) {
            someHidden = true
            if (!currentAlerts.length) {
              return null
            }
          }

          const className = currentAlerts[0].className
          return (
            <div className={className} key={type}>
              {
                currentAlerts.map((alert, index) => {
                  return (
                    <div className='width' key={type + '_' + alert.url + '_' + index}>
                      <LibMarkdown className='description'>{ alert.description }</LibMarkdown>
                      <span className={styles.hideAlert}>Hide Alert</span>
                    </div>
                  )
                })
              }
            </div>
          )
        })
      }
      { someHidden && (
        <div className={styles.showHiddenBar}>
          <span className={styles.showHiddenButton}>Show hidden alerts.</span>
        </div>
      )}
    </div>
  )
}

Alert.propTypes = {
  alerts: PropTypes.object,
  hiddenIds: PropTypes.arrayOf(PropTypes.string),
}

export default withErrorBoundary(Alert)
