import React from 'react'
import PropTypes from 'prop-types'

const Presenter = ({ hours, title, showEffectiveDates }) => {
  if (!hours.rows) {
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
          hours.rows.map((row, key) => {
            return (
              <span key={key}>
                <dt>{ row.rowDisplay }</dt>
                <dd>{ row.display }</dd>
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
