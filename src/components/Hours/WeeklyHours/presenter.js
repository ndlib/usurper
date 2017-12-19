import React from 'react'
import PropTypes from 'prop-types'

const Presenter = ({ hours, title, effectiveDate, showEffectiveDates }) => {
  if (Object.keys(hours).length === 0) {
    return (<div />)
  }
  let effectiveMessage = ''
  if (showEffectiveDates) {
    effectiveMessage = (<p> Starting On: { effectiveDate }</p>)
  }
  return (
    <div className='week'>
      <h5>{ title }</h5>
      { effectiveMessage }
      <dl className='hours-grid'>
        {
          hours.map((row) => {
            return (
              <span key={row.title} style={{ float: 'left', clear: 'left', width: '100%' }}>
                <dt>{ row.title }</dt>
                <dd style={{ float: 'right' }}>{ row.rendered }</dd>
              </span>
            )
          })
        }
      </dl>
    </div>
  )
}

Presenter.propTypes = {
  hours: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  effectiveDate: PropTypes.string.isRequired,
  showEffectiveDates: PropTypes.bool.isRequired,
}

export default Presenter
