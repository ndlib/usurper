import React from 'react'
import PropTypes from 'prop-types'

const Presenter = ({ hours, title, showEffectiveDates }) => {
  if (!hours) {
    return (<div />);
  }

  let effectiveMessage = "";
  if (showEffectiveDates) {
    effectiveMessage = (<p> Effective {hours.display } </p>);
  }
  return (
    <div>
      <h5>{ title }</h5>
      <dl className="hours-grid">
      {
        hours.rows.map(function (row, key) {
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
  );
}

Presenter.propTypes = {
  hours: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  showEffectiveDates: PropTypes.bool.isRequired,
}

export default Presenter
