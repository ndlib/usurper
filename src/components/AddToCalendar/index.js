import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from '../Link'

export default class AddToCalendar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      // 2018-05-31T11:00:00.000Z -> 20180531T110000Z
      start: new Date(this.props.startDate).toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z',
      end: new Date(this.props.endDate).toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z',
    }

    this.downloadClick = this.downloadClick.bind(this)
  }

  gmailUrl () {
    let calendarUrl = ''

    const location = encodeURIComponent(this.props.location)
    const title = encodeURIComponent(this.props.title)
    const desc = encodeURIComponent(this.props.description)

    calendarUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE'
    calendarUrl += '&dates=' + this.state.start
    calendarUrl += '/' + this.state.end
    calendarUrl += '&location=' + location
    calendarUrl += '&text=' + title
    calendarUrl += '&details=' + desc

    return calendarUrl
  }

  downloadClick () {
    const data = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      'URL:' + document.URL,
      'DTSTART:' + this.state.start,
      'DTEND:' + this.state.end,
      'SUMMARY:' + this.props.title,
      'DESCRIPTION:' + this.props.description,
      'LOCATION:' + this.props.location,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\n')

    // Download file, create fantom a tag
    let a = document.createElement('a')

    // set blob to download
    a.href = window.URL.createObjectURL(new Blob([data], { type: 'text/calendar' }))
    a.download = this.props.title

    // Append anchor to body.
    document.body.appendChild(a)
    a.click()

    // Remove anchor from body
    document.body.removeChild(a)
  }

  render () {
    return (
      <div className='addToCalendar'>
        <Link to={this.gmailUrl()}>
          <button className='google'>Add to Google Calendar</button>
        </Link>
        <a href='#' onClick={this.downloadClick}>
          <button className='download'>Download Event</button>
        </a>
      </div>
    )
  }
}

AddToCalendar.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  location: PropTypes.string,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
}
