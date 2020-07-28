import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'

import LibMarkdown from 'components/LibMarkdown'

import styles from './style.module.css'

const Alert = ({ alerts, hiddenIds, clearHiddenAlerts, hideAlert }) => {
  // Only allow hiding if the function was passed in (I.e. only for global alerts and while logged in)
  const canHide = !!(clearHiddenAlerts && hideAlert)
  let someHidden = false
  return (
    <div className={styles.alerts}>
      {
        // go through each alert type, putting all similar alerts into the same box
        Object.keys(alerts).map(type => {
          const currentAlerts = typy(alerts[type]).safeArray.filter(alert => !hiddenIds || !hiddenIds.includes(alert.id))
          if (currentAlerts.length < alerts[type].length) {
            someHidden = true
          }

          const className = currentAlerts.length ? currentAlerts[0].className : ''
          return (
            <div className={className} key={type}>
              {
                currentAlerts.map((alert) => {
                  return (
                    <div className={styles.alertContainer} key={alert.id}>
                      {typy(alert.description).isString
                        ? <LibMarkdown className={styles.description}>{alert.description}</LibMarkdown>
                        : alert.description // Assume it's a React component so we don't need to parse markdown
                      }
                      { canHide && (
                        <span className={styles.hideAlert} onClick={() => hideAlert(alert.id)}>Hide Alert</span>
                      )}
                    </div>
                  )
                })
              }
            </div>
          )
        })
      }
      { canHide && someHidden && (
        <div className={styles.showHiddenBar}>
          <div className={styles.showHiddenContainer}>
            <span className={styles.showHiddenButton} onClick={clearHiddenAlerts}>Show Hidden Alerts</span>
          </div>
        </div>
      )}
    </div>
  )
}

Alert.propTypes = {
  alerts: PropTypes.object,
  hiddenIds: PropTypes.arrayOf(PropTypes.string),
  clearHiddenAlerts: PropTypes.func,
  hideAlert: PropTypes.func,
}

export default Alert
