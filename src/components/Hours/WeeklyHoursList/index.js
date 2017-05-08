import React, { Component } from 'react'
import PropTypes from 'prop-types'

class WeeklyHoursRow extends Component {
  render () {
    let rowTitle = this.props.row.fromDay;
    if (this.props.row.toDay) {
      rowTitle += " - " + this.props.row.toDay;
    }
    return (
      <div>
        <dt>{ rowTitle }</dt>
        <dd>{ this.props.row.display }</dd>
      </div>
    );
  }
}

WeeklyHoursRow.propTypes = {
  row: PropTypes.object.isRequired
}

class WeeklyHoursList extends Component {
  render () {
    if (!this.props.hours) {
      return (<div />);
    }
    
    let effectiveMessage = "";
    if (this.props.showEffectiveDates) {
      effectiveMessage = (<p> Effective {this.props.hours.display } </p>);
    }
    return (
      <div>
        <h5>{ this.props.title }</h5>
        <dl className="hours-grid">
        {
          this.props.hours.rows.map(function (row, key) {
            return (
              <WeeklyHoursRow row={row} key={key} />
            )
          })
        }
        </dl>
      </div>
    );
  }
}

WeeklyHoursList.propTypes = {
  hours: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  showEffectiveDates: PropTypes.bool.isRequired,
}

export default WeeklyHoursList
