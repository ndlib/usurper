import React from 'react'
import PropTypes from 'prop-types'

const dayOrder = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const Presenter = ({ hours, title, showEffectiveDates }) => {
  if (Object.keys(hours).length === 0) {
    return (<div />)
  }

  let effectiveMessage = ''
  if (showEffectiveDates) {
    effectiveMessage = (<p> Effective {hours.display } </p>)
  }
  return (
    <div className="week">
      <h5>{ title }</h5>
      { effectiveMessage }
      <dl className='hours-grid'>
        {
          dayOrder.map((key) => {
            return (
              <span key={key}>
                <dt>{ key }</dt>
                <dd>{ hours[key].rendered }</dd>
              </span>
            )
          })
        }
      </dl>
    </div>
  )
}

Presenter.propTypes = {
  hours: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  showEffectiveDates: PropTypes.bool.isRequired,
}

export default Presenter
