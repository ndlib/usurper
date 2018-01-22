import React from 'react'
import Link from '../../Link'

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
                    <span className='prefix'>
                      {currentAllerts[0].prefix}
                    </span>
                    <Link className='description' to={alert.url}>
                      {alert.description}
                    </Link>
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

export default Alert
