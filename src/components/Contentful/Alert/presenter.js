import React from 'react'
import PropTypes from 'prop-types'
import { withErrorBoundary } from 'components/ErrorBoundary'
import LibMarkdown from 'components/LibMarkdown'
const Alert = ({ alerts }) => {
  return (
    <div className='alerts'>
      {
        // go through each alert type, putting all similar alerts into the same box
        Object.keys(alerts).map(key => {
          const currentAllerts = alerts[key]
          const className = currentAllerts[0].className

          return (
            <div className={className} key={key}>
              {
                currentAllerts.map((alert, index) => {
                  return (
                    <div className='width' key={key + '_' + alert.url + '_' + index}>
                      <LibMarkdown className='description'>{ alert.description }</LibMarkdown>
                    </div>
                  )
                })
              }
            </div>
          )
        })
      }
    </div>
  )
}

Alert.propTypes = {
  alerts: PropTypes.object,
}

export default withErrorBoundary(Alert)
